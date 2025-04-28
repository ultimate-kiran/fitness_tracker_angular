import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    getLoggedInUserId(): string | null {
        const user = JSON.parse(sessionStorage.getItem('user') || 'null');
        return user?.id || null;
      }
      

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }
}