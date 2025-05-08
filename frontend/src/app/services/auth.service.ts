import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Get user ID from localStorage safely
  getLoggedInUserId(): string | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('userId');
      console.log(userStr);
      console.log('god bless you');
      try {
        const user = userStr;
        return user;
      } catch {
        console.error('Invalid JSON in localStorage "user"');
        return null;  
      }
    }
    return null; // SSR fallback
  }
  getUsername(): string | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      try {
        const user = userStr ? JSON.parse(userStr) : null;
        return user?.username || null;
      } catch {
        console.error('Invalid JSON in localStorage "user"');
        return null;
      }
    }
    return null; // SSR fallback
  }
  
  // Get token from localStorage safely
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null; // SSR fallback
  }
}
