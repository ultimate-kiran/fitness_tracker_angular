import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = {
    username: '',
    height: 0,
    weight: 0,
    email: '',
    password: '',
    age: null,
    gender: '',
  };
  isEditing = false;
  successMsg = '';
  errorMsg = '';

  private userId: string | null = null;
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId) {
      this.loadUserProfile();
    } else {
      this.errorMsg = 'Please log in to view your profile.';
    }
  }

  loadUserProfile(): void {
    this.http.get(`${this.apiUrl}/profile/${this.userId}`).subscribe({
      next: (data: any) => {
        this.user = {
          username: data.username,
          height: data.height,
          weight: data.weight,
          email: data.email,
          password: '', // Password is not fetched for security
          age: data.age || null,
          gender: data.gender || '',
        };
        this.errorMsg = '';
      },
      error: (err) => {
        console.error('GET Error:', err);
        this.errorMsg = `Failed to load profile: ${err.error?.message || 'Server error'}`;
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Ensure the user object includes all fields
    const updatedUser = {
      username: this.user.username,
      height: this.user.height,
      weight: this.user.weight,
      email: this.user.email,
      age: this.user.age,
      gender: this.user.gender,
      password: this.user.password
    };
    // Only include password if it's been changed
    if (this.user.password) {
      updatedUser.password = this.user.password;
    }

    this.http.put(`${this.apiUrl}/profile/${this.userId}`, updatedUser).subscribe({
      next: () => {
        this.successMsg = 'Profile updated successfully!';
        this.isEditing = false;
        // Reload the profile to get the latest data
        this.loadUserProfile();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        console.error('PUT Error:', err);
        this.errorMsg = `Failed to update profile: ${err.error?.message || 'Server error'}`;
        setTimeout(() => this.errorMsg = '', 3000);
      },
    });
  }
  goToDashboard() {
    this.router.navigate(['/userdashboard']);
  }
  
}