// auth tsx
import axios from "axios"


const baseUrl = 'http://localhost:3000/auth'


export class AuthService {
    static async signUp(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/signup`, {
        email,
        password,
      });

        return response.data

        }

        catch (error: any){
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    }


    static async login(email: string, password: string){
        try {
            const response = await axios.post(`${baseUrl}/login`, {
              email,
              password,
            });
            return response.data; // Handle the response data as needed
          } catch(error : any){
            throw new Error (error.response?.data?.message || 'Signup failed')
          }
    }

    static async logout() {
        try {
          const response = await axios.post(`${baseUrl}/logout`);
          return response.data; // Handle the response data as needed
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Logout failed');
        }
      }
    
}