import axios from 'axios';

const baseUrl = 'http://localhost:3000/auth';  // Using localhost for local development

export class AuthService {
  static async signUp(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/signup`, { email, password });
        const {userId, token} = response.data
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      return response.data;
    } catch (error: any) {
      console.error('Error during signup:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Signup failed';
      throw new Error(errorMessage);
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const { userId, token } = response.data;

            // Save in localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token);

      return response.data;
    } catch (error: any) {
      console.error('Error during login:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  }

  static async logout(token?: string) {
    try {
      const response = await axios.post(
        `${baseUrl}/logout`,
        {},
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : undefined
      );
      return response.data;
    } catch (error: any) {
      console.error('Error during logout:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Logout failed';
      throw new Error(errorMessage);
    }
  }
}
