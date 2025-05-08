import { Component, ViewChild, ElementRef } from '@angular/core';
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

  // Validation flags
  isEmailValid: boolean = false;
  isPasswordValid: boolean = false;

  // Reference to password input for focusing
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  validateEmail() {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    this.isEmailValid = emailPattern.test(this.email);
  }

  validatePassword() {
    const password = this.password;
    this.isPasswordValid = password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  }

  focusNext() {
    if (this.isEmailValid) {
      this.passwordInput.nativeElement.focus();
    }
  }

  onSubmit() {
    // Reset error message
    this.errorMessage = '';

    // Ensure frontend validation passes
    if (!this.isEmailValid) {
      this.errorMessage = 'Please enter a valid email address (e.g., user@example.com or user@college.ac.in).';
      return;
    }

    if (!this.isPasswordValid) {
      this.errorMessage = 'Please enter a valid password (at least 8 characters, including one uppercase letter and one number).';
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.http.post('http://localhost:5000/api/login', loginData).subscribe({
      next: (response: any) => {
        console.log(response.message);

        if (response.isAdmin) {
          this.router.navigate(['/admindashboard']);
        } else {
          localStorage.setItem('userId', response.user.id);
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