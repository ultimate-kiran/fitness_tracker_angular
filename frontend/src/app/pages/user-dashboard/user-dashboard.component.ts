import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { WorkoutService } from '../../services/workout.service';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Workout {
  type: string;
  duration: number;
  calories: number;
  date: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule, FormsModule],
})
export class UserDashboardComponent implements OnInit {
  weight = 0;
  height = 0;
  bmi = 0;
  username: string = '';
  notifications: string[] = [];
  selectedData: string[] = [];
  userId: string = 'testUserId'; // default fallback
  showWorkoutsSection = false;
  showEditProfile = false;
  showLogoutConfirm = false; // Flag for logout confirmation prompt

  workoutHistory: Workout[] = [];
  caloriesData: number[] = [];
  dateLabels: string[] = [];
  caloriesChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  isBrowser: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private workoutService: WorkoutService,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  lineChartOptions = {
    responsive: true,
  };

  weightHistoryData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [],
        borderColor: 'rgba(126, 87, 194, 1)',
        backgroundColor: 'rgba(126, 87, 194, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  weightHistoryOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Weight: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        min: 70,
        max: 80,
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
    },
  };

  weeklyActivityData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  weeklyActivityOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Calories: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: { display: false },
        title: {
          display: true,
          text: 'Day of Week',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories',
        },
      },
    },
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userIdFromStorage = this.auth.getLoggedInUserId();
      const weightStr = localStorage.getItem('weight');
      const heightStr = localStorage.getItem('height');
      const usernameStr = localStorage.getItem('username');

      if (userIdFromStorage) {
        this.userId = userIdFromStorage;
      } else {
        console.error('❌ userId not found in AuthService/localStorage');
      }

      if (weightStr && heightStr && usernameStr) {
        this.weight = parseFloat(weightStr);
        this.height = parseFloat(heightStr);
        this.username = usernameStr;
        this.bmi = this.calculateBMI(this.weight, this.height);
      } else {
        console.error('❌ Weight/Height/Username not found in localStorage');
      }

      if (this.userId) {
        this.workoutService.getWorkouts(this.userId).subscribe((data: any[]) => {
          this.workoutHistory = data.map(w => ({
            ...w,
            date: typeof w.date === 'string' ? w.date : new Date(w.date).toISOString()
          }));

          this.dateLabels = this.workoutHistory.map(w =>
            new Date(w.date).toLocaleDateString()
          );
          this.caloriesData = this.workoutHistory.map(w => w.calories);

          this.caloriesChartData = {
            labels: this.dateLabels,
            datasets: [
              {
                data: this.caloriesData,
                label: 'Calories Burned',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
              }
            ]
          };
        });
      }
    }

    this.loadNotifications();
    this.loadWeeklyActivity();
  }

  loadNotifications() {
    this.notifications = [
      'New workout added: Sample Workout',
      'New recipe added: Sample Recipe',
    ];
  }

  viewNotifications() {
    this.selectedData = [...this.notifications];
  }

  loadWeeklyActivity() {
    if (!this.userId) {
      console.error('User ID is undefined, cannot fetch workout history');
      this.weeklyActivityData.datasets[0].data = Array(7).fill(0);
      return;
    }

    this.http.get<Workout[]>(`http://localhost:5000/api/workoutHistory/${this.userId}`).subscribe({
      next: (workouts) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        today.setHours(23, 59, 59, 999);

        const caloriesBurnedPerDay = Array(7).fill(0);

        workouts.forEach((workout) => {
          const workoutDate = new Date(workout.date);
          const localDate = new Date(workoutDate.getTime() + (workoutDate.getTimezoneOffset() * 60000));

          if (localDate >= startOfWeek && localDate <= today) {
            const dayIndex = (localDate.getDay() + 6) % 7;
            caloriesBurnedPerDay[dayIndex] += workout.calories || 0;
          }
        });

        this.weeklyActivityData.datasets[0].data = caloriesBurnedPerDay;
      },
      error: (err) => {
        console.error('Error fetching workout history:', err);
        this.weeklyActivityData.datasets[0].data = Array(7).fill(0);
      },
    });
  }

  setLoggedInUserId(id: string) {
    localStorage.setItem('userId', id);
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }

  calculateBMI(weight: number, height: number): number {
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

  showPastWorkouts() {
    const userId = this.auth.getLoggedInUserId();
    if (!userId) return;

    this.workoutService.getWorkouts(userId).subscribe((data: any[]) => {
      this.workoutHistory = data.map(w => ({
        ...w,
        date: typeof w.date === 'string' ? w.date : new Date(w.date).toISOString()
      }));

      this.dateLabels = this.workoutHistory.map(w =>
        new Date(w.date).toLocaleDateString()
      );
      this.caloriesData = this.workoutHistory.map(w => w.calories);

      this.caloriesChartData = {
        labels: this.dateLabels,
        datasets: [
          {
            data: this.caloriesData,
            label: 'Calories Burned',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true
          }
        ]
      };

      this.showWorkoutsSection = true;

      setTimeout(() => {
        document.getElementById('pastWorkoutsSection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  cancelEdit() {
    this.showEditProfile = false;
  }

  saveProfile() {
    if (!this.userId) {
      console.error('Cannot update profile: userId is undefined.');
      return;
    }

    const updatedUser = {
      username: this.username,
      weight: this.weight,
      height: this.height
    };

    this.http.put(`http://localhost:5000/api/users/${this.userId}`, updatedUser).subscribe({
      next: () => {
        localStorage.setItem('username', this.username);
        localStorage.setItem('weight', this.weight.toString());
        localStorage.setItem('height', this.height.toString());
        this.bmi = this.calculateBMI(this.weight, this.height);
        this.showEditProfile = false;
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      }
    });
  }

  logout(): void {
    this.showLogoutConfirm = false;
    this.router.navigate(['/login']); // Navigate to the login page
  }
  
  viewAboutus():void{
    this.showLogoutConfirm = false;
    this.router.navigate(['/aboutus']);
  }
}