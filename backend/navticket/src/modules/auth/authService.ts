import { 
  Injectable, 
  HttpException, 
  HttpStatus, 
  UnauthorizedException, 
  BadRequestException,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from 'src/config/supabase';

import { UserRole } from 'src/common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { plainToClass } from 'class-transformer';

class SignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  password: string;

  role?: UserRole;
  companyId?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(
    email: string, 
    password: string, 
    role: UserRole = UserRole.TRAVELER,
    companyId?: string
  ) {
    // Validate input
    const signUpDto = plainToClass(SignUpDto, { 
      email, 
      password, 
      role, 
      companyId 
    });
    const validationErrors = await validate(signUpDto);
    
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map(error => Object.values(error.constraints).join(', '))
        .join('; ');
      
      this.logger.error(`Validation failed: ${errorMessages}`);
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
  
    try {
      // 1. Check if email already exists
      const { data: existingUser } = await this.supabaseService
        .getClient()
        .from('auth.users')
        .select('email')
        .eq('email', email)
        .single();
  
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }
  
      // 2. Hash password with additional salt rounds and error handling
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds)
        .catch(err => {
          this.logger.error('Password hashing failed', err);
          throw new InternalServerErrorException('Password hashing failed');
        });
  
      // 3. Supabase signup 
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signUp({ 
          email, 
          password,
        });
  
      if (error) {
        this.logger.error(`Supabase signup error: ${error.message}`);
        throw new HttpException(
          error.message || 'Signup failed', 
          HttpStatus.BAD_REQUEST
        );
      }
  
      if (!data.user) {
        throw new InternalServerErrorException('User creation failed');
      }
  
      // 4. Insert additional metadata into the `user_metadata` table
      const { error: metadataError } = await this.supabaseService
        .getClient()
        .from('user_metadata')
        .insert({
          id: data.user.id,  // Link to the created user
          role,
          company_id: companyId || null  // Insert company_id if provided
        });
  
      if (metadataError) {
        // Attempt to delete the just-created auth user if metadata insert fails
        await this.supabaseService.getClient().auth.admin.deleteUser(data.user.id);
        
        this.logger.error(`Metadata insert error: ${metadataError.message}`);
        throw new InternalServerErrorException(
          metadataError.message || 'Failed to store user metadata'
        );
      }
  
      return { 
        message: 'User successfully registered', 
        userId: data.user.id 
      };
    } catch (error) {
      this.logger.error('Signup process failed', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Signup process encountered an unexpected error');
    }
  }
  

  async signIn(email: string, password: string) {
    // Input validation
    const signUpDto = plainToClass(SignUpDto, { email, password });
    const validationErrors = await validate(signUpDto, { 
      skipMissingProperties: true 
    });
    
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map(error => Object.values(error.constraints).join(', '))
        .join('; ');
      
      this.logger.error(`Validation failed: ${errorMessages}`);
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    try {
      // 1. Supabase login with detailed error handling
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signInWithPassword({ email, password });

      if (error) {
        this.logger.warn(`Login attempt failed for email: ${email}`);
        throw new UnauthorizedException(
          error.message || 'Invalid credentials'
        );
      }

      // 2. Fetch user metadata with robust error handling
      const { data: userData, error: userError } = await this.supabaseService
        .getClient()
        .from('user_metadata')
        .select('role, company_id')
        .eq('id', data.user.id)
        .single();

      if (userError || !userData) {
        this.logger.error(`User metadata not found for user: ${data.user.id}`);
        throw new UnauthorizedException('User metadata not found');
      }

      // 3. Generate tokens
      return this.generateTokens(
        data.user.id, 
        email, 
        userData.role, 
        userData.company_id
      );

    } catch (error) {
      this.logger.error('Signin process failed', error);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Signin process encountered an unexpected error');
    }
  }

  private generateTokens(
    userId: string, 
    email: string, 
    role: UserRole, 
    companyId?: string
  ) {
    try {
      console.log('JWT_SECRET:', process.env.JWT_SECRET);
      console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
  
      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new Error('Missing JWT secrets in environment variables');
      }
  
      const payload = { 
        sub: userId, 
        email, 
        role,
        companyId
      };
  
      const accessToken = this.jwtService.sign(
        payload, 
        { 
          expiresIn: '1h',
          secret: process.env.JWT_SECRET 
        }
      );
  
      const refreshToken = this.jwtService.sign(
        payload, 
        { 
          expiresIn: '7d', 
          secret: process.env.JWT_REFRESH_SECRET 
        }
      );
  
      return { access_token: accessToken, refresh_token: refreshToken };
    } catch (error) {
      this.logger.error('Token generation failed', error);
      throw new InternalServerErrorException('Failed to generate authentication tokens');
    }
  }
  

  async logout() {
    try {
      const { error } = await this.supabaseService.getClient().auth.signOut();
      
      if (error) {
        this.logger.error(`Logout error: ${error.message}`);
        throw new InternalServerErrorException(
          error.message || 'Logout failed'
        );
      }
      
      return { message: 'Logged out successfully' };
    } catch (error) {
      this.logger.error('Logout process failed', error);
      throw new InternalServerErrorException('Logout process encountered an unexpected error');
    }
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify(
        refreshToken, 
        { secret: process.env.JWT_REFRESH_SECRET }
      );

      
      return this.generateTokens(
        payload.sub, 
        payload.email, 
        payload.role, 
        payload.companyId
      );
    } catch (error) {
      this.logger.warn('Token refresh attempt failed', error);
      
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token has expired');
      }
      
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}