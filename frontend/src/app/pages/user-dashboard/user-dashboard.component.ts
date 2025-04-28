import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute }        from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  standalone: true, // ✅ Make this a standalone component
  imports: [CommonModule,RouterModule]
})

export class UserDashboardComponent implements OnInit {
weight = 0;
height = 0;
bmi = 0;
selectedData: string[] = [];
username: string = '';

ngOnInit(): void {
  // Get user data from localStorage
  const weightStr = localStorage.getItem('weight');
  const heightStr = localStorage.getItem('height');
  const usernameStr = localStorage.getItem('username');

  if (weightStr && heightStr && usernameStr) {
    this.weight = parseFloat(weightStr);
    this.height = parseFloat(heightStr);
    this.username = usernameStr;

    this.bmi = this.calculateBMI(this.weight, this.height);
  } else {
    console.error('User data not found in localStorage');
  }
}

calculateBMI(weight: number, height: number): number {
  // height in cm -> meters
  const heightInMeters = height / 100;
  return +(weight / (heightInMeters * heightInMeters)).toFixed(2);
}

  viewWorkouts() {
    this.selectedData = [
      'Chest workout - 3 sets of 12 reps',
      'Leg day - 4 sets of squats',
      'Cardio - 30 mins treadmill',
    ];
  }

  viewNutrition() {
    this.selectedData = [
      'Breakfast: Oatmeal + Banana',
      'Lunch: Grilled Chicken + Brown Rice',
      'Dinner: Salad + Protein Shake',
    ];
  }
}
