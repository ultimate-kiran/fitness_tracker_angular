import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    weight: null as number | null,
    height: null as number | null,
    email: '',
    password: ''
  };

  // Validation flags
  isUsernameValid: boolean = false;
  isWeightValid: boolean = false;
  isHeightValid: boolean = false;
  isEmailValid: boolean = false;
  isPasswordValid: boolean = false;

  // References to input elements for focusing
  @ViewChild('weight') weightInput!: ElementRef;
  @ViewChild('height') heightInput!: ElementRef;
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  validateUsername() {
    const usernamePattern = /^[A-Za-z\s]+$/;
    this.isUsernameValid = usernamePattern.test(this.user.username) && this.user.username.trim().length > 0;
  }

  validateWeight() { 
    this.isWeightValid = this.user.weight !== null && ((this.user.weight)%2 !== 0) && this.user.weight >= 30 && this.user.weight <= 300;
    
  }

  validateHeight() {
    this.isHeightValid = this.user.height !== null && this.user.height >= 100 && this.user.height <= 250;
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    this.isEmailValid = emailPattern.test(this.user.email);
  }

  validatePassword() {
    const password = this.user.password;
    this.isPasswordValid = password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  }

  focusNext(nextField: string) {
    switch (nextField) {
      case 'weight':
        if (this.isUsernameValid) {
          this.weightInput.nativeElement.focus();
        }
        break;
      case 'height':
        if (this.isWeightValid) {
          this.heightInput.nativeElement.focus();
        }
        break;
      case 'email':
        if (this.isHeightValid) {
          this.emailInput.nativeElement.focus();
        }
        break;
      case 'password':
        if (this.isEmailValid) {
          this.passwordInput.nativeElement.focus();
        }
        break;
    }
  }

  onSubmit() {
    // Form validation is already handled by Angular's form controls and validation flags
    if (!this.isUsernameValid || !this.isWeightValid || !this.isHeightValid || !this.isEmailValid || !this.isPasswordValid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Send data to server
    this.http.post('http://localhost:5000/api/signup', this.user)
      .subscribe({
        next: (res: any) => {
          console.log('User created:', res);
          alert(res.message || 'Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup failed:', err);
          const msg = err.error?.message || 'Signup failed! Try again.';
          alert(msg);
        }
      });
  }
}