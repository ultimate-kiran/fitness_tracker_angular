import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkoutDialogComponent } from './add-workout-dialog/add-workout-dialog.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//import { MatCardModule } from '@angular/material/card';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
  imports: [CommonModule, ReactiveFormsModule /* other imports */]
 // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkoutComponent {
  totalWorkouts = 4;
  totalMinutes = 175;
  totalCalories = 1380;
  currentMonth = 'April';

  workouts = [
    { title: 'Upper Body Strength', duration: '45 min', intensity: 'High', calories: 350, exerciseCount: 8 },
    { title: 'HIIT Cardio', duration: '30 min', intensity: 'High', calories: 420, exerciseCount: 6 },
    { title: 'Yoga Flow', duration: '50 min', intensity: 'Medium', calories: 310, exerciseCount: 7 },
    { title: 'Lower Body Focus', duration: '50 min', intensity: 'Medium', calories: 300, exerciseCount: 7 },
  ];

  constructor(private dialog: MatDialog) {}

  openAddWorkoutDialog() {
    const dialogRef = this.dialog.open(AddWorkoutDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workouts.push(result);
        this.totalWorkouts++;
        this.totalMinutes += parseInt(result.duration);
        this.totalCalories += parseInt(result.calories);
      }
    });
  }
}
