import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  weeklyChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [5000, 6000, 7500, 6800, 6600, 8000, 7200],
        backgroundColor: '#0ea5e9'
      }
    ]
  };

  weeklyGoals = [
    { icon: '👣', label: 'Steps', value: 48500, goal: 70000 },
    { icon: '🔥', label: 'Calories Burned', value: 2450, goal: 3500 },
    { icon: '💧', label: 'Water Intake', value: 9, goal: 8 },
    { icon: '⏱️', label: 'Workouts', value: 3, goal: 5 }
  ];

  recentWorkouts = [
    { name: 'Upper Body Strength', date: 'Today, 9:30 AM', duration: 45, intensity: 8, calories: 350, level: 'High' },
    { name: 'HIIT Cardio', date: 'Yesterday, 6:15 PM', duration: 30, intensity: 6, calories: 420, level: 'High' }
  ];
  //constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToWorkout() {
    this.router.navigate(['/workout']);
  }

  goToNutrition() {
    this.router.navigate(['/nutrition']);
  }

  goToProgress() {
    this.router.navigate(['/progress']);
  }

  logout() {
    this.router.navigate(['/home']);
  }
  username: string = 'User'; // default fallback

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { user: any };

    if (state?.user) {
      this.username = state.user.username;
    }
  }
}