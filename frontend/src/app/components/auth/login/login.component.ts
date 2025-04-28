import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private http: HttpClient, private router: Router) {}


  onSubmit() {
    const loginData = { email: this.email, password: this.password };
  
    this.http.post('http://localhost:5000/api/login', loginData).subscribe({
      next: (response: any) => {
        console.log(response.message);
  
        if (response.isAdmin) {
          this.router.navigate(['/admindashboard']);
        } else {
          // ✅ Store full user object
          sessionStorage.setItem('user', JSON.stringify(response.user));
  
          // Optional: also keep separate fields if needed
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('weight', response.user.weight?.toString() || '0');
          localStorage.setItem('height', response.user.height?.toString() || '0');
  
          this.router.navigate(['/userdashboard', response.user.id]);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Login failed';
        console.error('Login error:', error);
      }
    });
  }
  
}
