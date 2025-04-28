import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkoutDialogComponent } from './add-workout-dialog/add-workout-dialog.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-workout',
  imports: [CommonModule],
  templateUrl: './workout.component.html',
})
export class WorkoutComponent implements OnInit {
  currentMonth: string = new Date().toLocaleString('default', { month: 'long' });

  totalWorkouts = 0;
  totalMinutes = 0;
  totalCalories = 0;

  workouts: any[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  openAddWorkoutDialog(): void {
    const dialogRef = this.dialog.open(AddWorkoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userId = localStorage.getItem('userId') || '';
        const workoutData = { ...result, userId };

        this.http.post('http://localhost:3000/api/workouts', workoutData).subscribe({
          next: () => this.fetchWorkouts(),
          error: (err) => console.error('Error adding workout:', err),
        });
      }
    });
  }

  fetchWorkouts(): void {
    const userId = localStorage.getItem('userId') || '';
    this.http.get<any[]>(`http://localhost:3000/api/workouts/user/${userId}`).subscribe({
      next: (workouts) => {
        this.workouts = workouts;
        this.totalWorkouts = workouts.length;
        this.totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
        this.totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
      },
      error: (err) => console.error('Error fetching workouts:', err),
    });
  }
}
