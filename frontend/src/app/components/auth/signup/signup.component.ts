import { Component } from '@angular/core';
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
    weight: 0,
    height: 0,
    email: '',
    password: ''
  };


  constructor(private http: HttpClient, private router: Router) {}


  onSubmit() {
    if (!this.user.username || !this.user.weight || !this.user.height || !this.user.email || !this.user.password) {
      alert('Please fill in all fields.');
      return;
    }
 
    // ✅ Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.user.email)) {
      alert('Please enter a valid email address.');
      return;
    }
 
    // ✅ Password strength check (optional - frontend match to backend)
    const password = this.user.password;
    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
      alert('Password must be at least 8 characters long, include a number and an uppercase letter.');
      return;
    }
 
    // ✅ Send data to server
    this.http.post('http://localhost:5000/api/signup', this.user)
      .subscribe({
        next: (res: any) => {
          console.log('User created:', res);
          alert(res.message || 'Signup successful!');
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Signup failed:', err);
          const msg = err.error?.message || 'Signup failed! Try again.';
          alert(msg);
        }
      });
  }


}
