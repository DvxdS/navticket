import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase';

@Injectable()
export class AuthService{
    constructor (private readonly supabaseService : SupabaseService) {}
    
    async signUp(email : string, password : string) {
        const {data, error} = await  this.supabaseService 
        .getClient()
        .auth.signUp({email, password});

        if (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

        }

        return data;
    }

    async signIn(email: string, password: string){
        const { data, error } = await this.supabaseService
        .getClient()
        .auth.signInWithPassword({ email, password });
  
      if (error) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
  
      return data;
    }

    async logout() {
        const { error } = await this.supabaseService.getClient().auth.signOut();
        if (error) throw new Error(error.message);
        return { message: 'Logged out successfully' };
      }
    
}