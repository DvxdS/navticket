// src/modules/auth/auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { AuthService } from './authService';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from 'src/common/enums/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role?: UserRole
  ) {
    return this.authService.signUp(email, password, role);
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.signIn(email, password);
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async logout() {
    return this.authService.logout();
  }
}