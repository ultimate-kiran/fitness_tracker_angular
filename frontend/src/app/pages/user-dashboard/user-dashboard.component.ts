import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute }        from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  standalone: true, // ✅ Make this a standalone component
  imports: [CommonModule]
})

export class UserDashboardComponent implements OnInit {
  weight = 0;
  height = 0;
  bmi = 0;
  selectedData: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 1. grab the :id from the URL
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      console.error('No user ID in URL!');
      return;
    }

    // 2. fetch their data
    this.http
      .get<{ weight: number; height: number }>(`http://localhost:3000/api/user/${userId}`)
      .subscribe({
        next: data => {
          this.weight = data.weight;
          this.height = data.height;
          this.bmi = this.calculateBMI(this.weight, this.height);
        },
        error: err => console.error('Error fetching user data:', err)
      });
  }
  calculateBMI(weight: number, height: number): number {
    const heightMeters = height / 100;
    return +(weight / (heightMeters * heightMeters)).toFixed(1);
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
