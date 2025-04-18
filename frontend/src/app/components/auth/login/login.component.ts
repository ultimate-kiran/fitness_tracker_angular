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
    this.http.post('http://localhost:3000/api/login', loginData).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.router.navigate(['/userdashboard', response.user.id]);
        
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Login failed';
        console.error('Login error:', error);
      }
    });
  }
}