import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../backend/models/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout1.component.html',
  styleUrls: ['./workout1.component.css'],
})
export class WorkoutComponent implements OnInit {
  workout: Workout = {
    userId: '',
    type: 'Strength Training', // Default value, will be overridden by selected exercise
    duration: 0,
    date: new Date().toISOString().split('T')[0],
    calories: 0,
  };
  workouts: Workout[] = [];
  successMsg = '';
  errorMsg = '';
  selectedExercise: any = null;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeUserId();
    // Retrieve selected exercise from navigation state using ActivatedRoute
    this.route.queryParams.subscribe(params => {
      if (params['selectedExercise']) {
        this.selectedExercise = JSON.parse(params['selectedExercise']);
        console.log('Received Selected Exercise:', this.selectedExercise);
        // Set workout type to the exercise name directly (as per image)
        this.workout.type = this.selectedExercise.name;
        console.log('Set Workout Type:', this.workout.type);
      } else {
        console.warn('No selected exercise found in query params.');
        // Fallback: Check state from navigation
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state?.['selectedExercise']) {
          this.selectedExercise = navigation.extras.state['selectedExercise'];
          console.log('Received Selected Exercise from state:', this.selectedExercise);
          this.workout.type = this.selectedExercise.name;
          console.log('Set Workout Type from state:', this.workout.type);
        } else {
          console.warn('No selected exercise found in navigation state.');
          this.workout.type = 'Strength Training'; // Default fallback
        }
      }
    });

    if (this.workout.userId) {
      this.loadWorkouts();
    } else {
      this.errorMsg = 'User not logged in. Please log in to continue.';
    }
  }

  private initializeUserId() {
    const userId = this.authService.getLoggedInUserId();
    console.log('User ID:', userId);
    if (!userId) {
      this.errorMsg = 'Please log in to view or add workouts.';
      return;
    }
    this.workout.userId = userId;
  }

  loadWorkouts() {
    if (!this.workout.userId) {
      this.errorMsg = 'Cannot load workouts: User ID is missing.';
      return;
    }

    this.workoutService.getWorkouts(this.workout.userId).subscribe({
      next: (data) => {
        this.workouts = data;
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = `Failed to load workouts: ${err.message || 'Server error'}`;
        console.error('GET Error:', err);
      },
    });
  }

  postWorkout() {
    if (!this.isValidWorkout()) {
      this.errorMsg = 'Please fill in all required fields correctly.';
      setTimeout(() => (this.errorMsg = ''), 3000);
      return;
    }

    this.workout.date = new Date(this.workout.date).toISOString();

    this.workoutService.postWorkout(this.workout).subscribe({
      next: () => {
        this.successMsg = 'Workout posted successfully!';
        this.errorMsg = '';
        this.loadWorkouts();
        this.resetWorkoutForm();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.errorMsg = `Failed to post workout: ${err.error?.message || 'Invalid request'}`;
        console.error('POST Error:', err);
        setTimeout(() => (this.errorMsg = ''), 3000);
      },
    });
  }

  private isValidWorkout(): boolean {
    return (
      !!this.workout.userId &&
      !!this.workout.type &&
      this.workout.duration > 0 &&
      !!this.workout.date &&
      this.workout.calories >= 0
    );
  }

  private resetWorkoutForm() {
    this.workout = {
      userId: this.workout.userId,
      type: this.workout.type, // Preserve the read-only type
      duration: 0,
      date: new Date().toISOString().split('T')[0],
      calories: 0,
    };
  }

  // Removed: determineWorkoutType (since we're using the exercise name directly)

  // New: Calculate calories based on exercise and duration
  calculateCalories() {
    if (!this.selectedExercise || !this.workout.duration || this.workout.duration <= 0) {
      this.workout.calories = 0;
      return;
    }

    // MET values for different exercises (approximate)
    const metValues: { [key: string]: number } = {
      'Barbell Curl': 4.0, // Strength training, moderate effort
      'Kettlebell Swing': 8.0, // High-intensity strength training
      'Kettlebell Goblet Squat': 6.0, // Moderate to high intensity
      'Treadmill Running': 9.0, // Cardio, running
      'Yoga Flow': 3.0, // Yoga, light effort
      'HIIT Session': 8.0, // High-intensity interval training
    };

    // Default MET value if exercise is not in the list
    const met = metValues[this.selectedExercise.name] || 4.0; // Default to moderate strength training

    // Assume average user weight of 70 kg (can be customized later)
    const weightKg = 70;
    // Formula: Calories = MET * weight (kg) * duration (hours)
    const durationHours = this.workout.duration / 60;
    const calories = met * weightKg * durationHours;

    this.workout.calories = Math.round(calories); // Round to nearest integer
    console.log(`Calculated Calories: ${this.workout.calories} (MET: ${met}, Duration: ${this.workout.duration} mins)`);
  }
}