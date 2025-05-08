import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../backend/models/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    type: 'Incline Bench Press (Dumbbell)',
    sets: 0,
    reps: 0,
    intensity: '',
    timePerRep: 0,
    restTime: 0,
    date: new Date().toISOString().split('T')[0],
    calories: 0,
  };
  workouts: Workout[] = [];
  successMsg = '';
  errorMsg = '';
  showSuccessModal: boolean = false;
  selectedExercise: any = null;
  minDate: string = '2025-05-04';
  visibleTooltips: { [key: string]: boolean } = {
    workoutType: false,
    sets: false,
    reps: false,
    intensity: false,
    timePerRep: false,
    restTime: false,
    date: false,
  };

  // Validation flags
  isSetsValid: boolean = false;
  isRepsValid: boolean = false;
  isIntensityValid: boolean = false;
  isTimePerRepValid: boolean = true; // Can be 0, so default to true
  isRestTimeValid: boolean = true; // Can be 0, so default to true
  isDateValid: boolean = false;
  isFormValid: boolean = false;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initializeUserId();

    const navigation = this.router.getCurrentNavigation();
    const stateExercise = navigation?.extras?.state?.['selectedExercise'];

    this.route.queryParams.subscribe(params => {
      if (params['selectedExercise']) {
        try {
          this.selectedExercise = JSON.parse(params['selectedExercise']);
          console.log('Received Selected Exercise from query:', this.selectedExercise);
        } catch (e) {
          console.error('Error parsing selectedExercise:', e);
          this.errorMsg = 'Invalid exercise data.';
        }
      } else if (stateExercise) {
        this.selectedExercise = stateExercise;
        console.log('Received Selected Exercise from navigation state:', this.selectedExercise);
      }

      if (this.selectedExercise && this.selectedExercise.name) {
        this.workout.type = this.selectedExercise.name;
        console.log('Set Workout Type:', this.workout.type);
      } else {
        this.workout.type = 'Incline Bench Press (Dumbbell)';
        console.warn('No valid selected exercise found, defaulting to Incline Bench Press (Dumbbell).');
      }
    });

    if (this.workout.userId) {
      this.loadWorkouts();
    } else {
      this.errorMsg = 'User not logged in. Please log in to continue.';
    }

    this.validateInputs();
  }

  private initializeUserId() {
    const userId = this.authService.getLoggedInUserId();
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

  validateInputs() {
    // Validate Sets (1 to 6)
    this.isSetsValid = this.workout.sets >= 1 && this.workout.sets <= 6;

    // Validate Reps (1 to 15)
    this.isRepsValid = this.workout.reps >= 1 && this.workout.reps <= 15;

    // Validate Intensity (must be selected)
    this.isIntensityValid = !!this.workout.intensity && ['Low', 'Moderate', 'High'].includes(this.workout.intensity);

    // Validate Time per Rep (0 to 4)
    this.isTimePerRepValid = this.workout.timePerRep >= 0 && this.workout.timePerRep <= 4;

    // Validate Rest Time (0 to 180)
    this.isRestTimeValid = this.workout.restTime >= 0 && this.workout.restTime <= 180;

    // Validate Date (not in the past)
    const selectedDate = new Date(this.workout.date);
    const today = new Date('2025-05-04');
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    this.isDateValid = !!this.workout.date && selectedDate >= today;

    // Overall form validity
    this.isFormValid =
      this.isSetsValid &&
      this.isRepsValid &&
      this.isIntensityValid &&
      this.isTimePerRepValid &&
      this.isRestTimeValid &&
      this.isDateValid;
  }

  postWorkout() {
    if (!this.isFormValid) {
      this.errorMsg = 'Please correct all fields before submitting.';
      setTimeout(() => (this.errorMsg = ''), 3000);
      return;
    }

    const workoutToPost = {
      ...this.workout,
      userId: this.workout.userId,
      type: this.selectedExercise?.name || 'Custom Workout',
      date: new Date(this.workout.date).toISOString(),
    };

    this.workoutService.postWorkout(workoutToPost).subscribe({
      next: () => {
        this.showSuccessModal = true;
        this.errorMsg = '';
        this.loadWorkouts();
        this.resetWorkoutForm();
      },
      error: (err) => {
        this.errorMsg = `Failed to post workout: ${err.error?.message || 'Invalid request'}`;
        console.error('POST Error:', err);
        setTimeout(() => (this.errorMsg = ''), 3000);
      },
    });
  }

  private resetWorkoutForm() {
    this.workout = {
      userId: this.workout.userId,
      type: this.selectedExercise?.name || 'Incline Bench Press (Dumbbell)',
      sets: 0,
      reps: 0,
      intensity: '',
      timePerRep: 0,
      restTime: 0,
      date: new Date().toISOString().split('T')[0],
      calories: 0,
    };
    this.validateInputs();
  }

  calculateCalories() {
    // Cap values at their maximums to prevent invalid calculations
    if (this.workout.sets < 0) this.workout.sets = 0;
    if (this.workout.sets > 6) this.workout.sets = 6;
    if (this.workout.reps < 0) this.workout.reps = 0;
    if (this.workout.reps > 15) this.workout.reps = 15;
    if (this.workout.timePerRep < 0) this.workout.timePerRep = 0;
    if (this.workout.timePerRep > 4) this.workout.timePerRep = 4;
    if (this.workout.restTime < 0) this.workout.restTime = 0;
    if (this.workout.restTime > 180) this.workout.restTime = 180;

    if (
      !this.selectedExercise ||
      !this.workout.sets ||
      !this.workout.reps ||
      !this.workout.intensity ||
      this.workout.sets <= 0 ||
      this.workout.reps <= 0
    ) {
      this.workout.calories = 0;
      return;
    }

    this.http.get(`http://localhost:5000/api/exercises/name/${this.selectedExercise.name}`).subscribe({
      next: (exercise: any) => {
        let met = exercise.MET || 5.0;
        const intensityFactors: { [key: string]: number } = {
          Low: 0.8,
          Moderate: 1.0,
          High: 1.2,
        };
        const intensityFactor = intensityFactors[this.workout.intensity] || 1.0;
        met *= intensityFactor;

        this.http.get(`http://localhost:5000/api/users/${this.workout.userId}`).subscribe({
          next: (users: any) => {
            const weightKg = users[0].weight || 50;
            const timePerSetSeconds = this.workout.reps * this.workout.timePerRep;
            const activeTimeSeconds = this.workout.sets * timePerSetSeconds;
            const restTimeTotalSeconds = (this.workout.sets - 1) * this.workout.restTime;
            const totalTimeSeconds = activeTimeSeconds + restTimeTotalSeconds;
            const totalTimeHours = totalTimeSeconds / 3600;

            const calories = met * weightKg * totalTimeHours;
            this.workout.calories = Math.round(calories);
          },
          error: (err) => {
            console.error('Error fetching user weight:', err);
            this.workout.calories = 0;
          },
        });
      },
      error: (err) => {
        console.error('Error fetching MET value:', err);
        this.workout.calories = 0;
      },
    });
  }

  toggleTooltip(field: string) {
    Object.keys(this.visibleTooltips).forEach(key => {
      if (key !== field) {
        this.visibleTooltips[key] = false;
      }
    });
    this.visibleTooltips[field] = !this.visibleTooltips[field];
  }

  navigateToExercise() {
    this.router.navigate(['/exercise']);
  }

  navigateToHome() {
    this.showSuccessModal = false;
    this.router.navigate(['/userdashboard']);
  }
}