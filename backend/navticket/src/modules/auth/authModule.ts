import { Module } from '@nestjs/common';
import { AuthController } from './authController';
import { AuthService } from './authService';
import { SupabaseService } from 'src/config/supabase';

@Module({
    controllers: [AuthController],
    providers: [AuthService, SupabaseService],
    exports: [AuthService],
  })
  export class AuthModule {}