import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './authService'
import { AuthDto } from './authDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto.email, authDto.password);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.email, authDto.password);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

 

}