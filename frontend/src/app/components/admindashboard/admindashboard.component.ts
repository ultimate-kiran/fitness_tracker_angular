import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  activeTab: string = 'workouts';
  users: any[] = [];
  workouts: any[] = [];
  recipes: any[] = [];
  showList: boolean = true;
  showForm: boolean = false;
  editingWorkout: any = null;
  editingRecipe: any = null;
  selectedMealType: string = '';
  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner'];
  newWorkout = {
    name: '',
    equipment: '',
    primaryMuscle: '',
    secondaryMuscle: '',
  };
  newRecipe = {
    ' mealtype': '',
    Title: '',
    Ingredients: '',
    Instructions: '',
    Cleaned_Ingredients: '',
    calories: 0,
    carbs: null as number | null,
    fat: null as number | null,
    protein: null as number | null,
  };
  selectedUserId: string | null = null;

  // Chart data for Weekly Activity (calories burned)
  weeklyActivityData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
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
  };

  // Chart data for Weight Tracker
  weightTrackerData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };
  weightTrackerOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Weight: ${context.raw}`,
        },
      },
    },
  };

  currentWeight: number = 0;
  goalWeight: number = 68;
  progressPercentage: number = 0;

  constructor(private http: HttpClient, private notificationService: NotificationService,private router:Router) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'workouts') {
      this.showList = true;
      this.showForm = false;
      this.loadWorkouts();
    } else if (tab === 'users') {
      this.loadUsers();
    } else if (tab === 'nutrition') {
      this.selectedMealType = '';
      this.recipes = [];
    }
  }

  loadWorkouts(): void {
    this.http.get('http://localhost:5000/api/exercises').subscribe({
      next: (data: any) => {
        this.workouts = data;
      },
      error: (err) => {
        console.error('Error fetching workouts:', err);
      },
    });
  }

  loadUsers(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  loadRecipes(mealType: string): void {
    this.selectedMealType = mealType;
    console.log('Fetching recipes for meal type:', mealType);
    this.http.get(`http://localhost:5000/api/recipes?mealType=${mealType}`).subscribe({
      next: (data: any) => {
        console.log('Recipes fetched:', data);
        this.recipes = data;
        console.log('Recipes array length:', this.recipes.length);
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        console.log('Error status:', err.status, 'Error message:', err.statusText);
      },
    });
  }

  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.loadUserData(userId);
  }

  loadUserData(userId: string): void {
    this.http.get(`http://localhost:5000/api/workoutHistory/${userId}`).subscribe({
      next: (workouts: any) => {
        this.updateWeeklyActivity(workouts);
      },
      error: (err) => {
        console.error('Error fetching workout history:', err);
      },
    });
    this.http.get(`http://localhost:5000/api/weightHistory/${userId}`).subscribe({
      next: (weightLogs: any) => {
        this.updateWeightTracker(weightLogs);
      },
      error: (err) => {
        console.error('Error fetching weight history:', err);
      },
    });
  }

  updateWeeklyActivity(workouts: any[]): void {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const caloriesPerDay = Array(7).fill(0);

    workouts.forEach((workout: any) => {
      const workoutDate = new Date(workout.date);
      const dayIndex = (workoutDate.getDay() + 6) % 7;
      if (workoutDate >= startOfWeek && workoutDate <= today) {
        caloriesPerDay[dayIndex] += workout.caloriesBurned || 0;
      }
    });

    this.weeklyActivityData.datasets[0].data = caloriesPerDay;
  }

  updateWeightTracker(weightLogs: any[]): void {
    const labels: string[] = [];
    const weights: number[] = [];

    weightLogs.forEach((log: any) => {
      const date = new Date(log.date);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      weights.push(log.weight);
    });

    this.weightTrackerData.labels = labels;
    this.weightTrackerData.datasets[0].data = weights;

    if (weights.length > 0) {
      this.currentWeight = weights[weights.length - 1];
      this.calculateProgress();
    }
  }

  calculateProgress(): void {
    if (this.currentWeight && this.goalWeight) {
      const initialWeight = 79;
      const totalLossNeeded = initialWeight - this.goalWeight;
      const currentLoss = initialWeight - this.currentWeight;
      this.progressPercentage = Math.round((currentLoss / totalLossNeeded) * 100);
    }
  }

  postWorkout(): void {
    this.http.post('http://localhost:5000/api/exercises', this.newWorkout).subscribe({
      next: (response: any) => {
        this.workouts.push(response);
        this.resetWorkoutForm();
        this.showList = true;
        this.showForm = false;
        this.notificationService.addNotification('New workout added', response._id);
      },
      error: (err) => {
        console.error('Error posting workout:', err);
        alert(err.error.message || 'Failed to add workout. Please check your inputs.');
      },
    });
  }

  editWorkout(workout: any): void {
    this.editingWorkout = { ...workout };
    this.showList = false;
  }

  updateWorkout(): void {
    if (this.editingWorkout && this.editingWorkout._id) {
      this.http.put(`http://localhost:5000/api/exercises/${this.editingWorkout._id}`, this.editingWorkout).subscribe({
        next: (response: any) => {
          const index = this.workouts.findIndex(w => w._id === response._id);
          if (index !== -1) this.workouts[index] = response;
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Error updating workout:', err);
          alert(err.error.message || 'Failed to update workout. Please check your inputs.');
        },
      });
    }
  }

  deleteWorkout(workoutId: string): void {
    this.http.delete(`http://localhost:5000/api/exercises/${workoutId}`).subscribe({
      next: () => {
        this.workouts = this.workouts.filter(workout => workout._id !== workoutId);
      },
      error: (err) => {
        console.error('Error deleting workout:', err);
      },
    });
  }

  deleteUser(userId: string): void {
    this.http.delete(`http://localhost:5000/api/users/${userId}`).subscribe({
      next: () => {
        this.users = this.users.filter(user => user._id !== userId);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }

  resetWorkoutForm(): void {
    this.newWorkout = {
      name: '',
      equipment: '',
      primaryMuscle: '',
      secondaryMuscle: '',
    };
  }

  cancelEdit(): void {
    this.editingWorkout = null;
    this.showList = true;
  }

  editRecipe(recipe: any): void {
    this.editingRecipe = { ...recipe };
  }

  calculateCalories(): void {
    const carbs = this.newRecipe.carbs || 0;
    const fats = this.newRecipe.fat || 0;
    const proteins = this.newRecipe.protein || 0;
    this.newRecipe.calories = (carbs * 4) + (fats * 9) + (proteins * 4);
  }

  calculateEditingCalories(): void {
    if (this.editingRecipe) {
      const carbs = this.editingRecipe.carbs || 0;
      const fats = this.editingRecipe.fat || 0;
      const proteins = this.editingRecipe.protein || 0;
      this.editingRecipe.calories = (carbs * 4) + (fats * 9) + (proteins * 4);
    }
  }

  updateRecipe(): void {
    if (this.editingRecipe && this.editingRecipe._id) {
      this.http.put(`http://localhost:5000/api/recipes/${this.editingRecipe._id}`, this.editingRecipe).subscribe({
        next: (response: any) => {
          const index = this.recipes.findIndex(r => r._id === response._id);
          if (index !== -1) this.recipes[index] = response;
          this.updateNutritionForRecipe(response);
          this.cancelEditRecipe();
        },
        error: (err) => {
          console.error('Error updating recipe:', err);
          alert(err.error.message || 'Failed to update recipe. Please check your inputs.');
        },
      });
    }
  }

  updateNutritionForRecipe(updatedRecipe: any): void {
    this.http.get(`http://localhost:5000/api/nutrition?foodName=${updatedRecipe.Title}`).subscribe({
      next: (nutritionEntries: any) => {
        nutritionEntries.forEach((entry: any) => {
          const updatedNutrition = {
            ...entry,
            calories: updatedRecipe.calories || entry.calories,
            carbs: updatedRecipe.carbs || entry.carbs,
            protein: updatedRecipe.protein || entry.protein,
            fat: updatedRecipe.fat || entry.fat,
          };
          this.http.put(`http://localhost:5000/api/nutrition/${entry._id}`, updatedNutrition).subscribe({
            next: () => {
              console.log(`Updated nutrition entry for ${updatedRecipe.Title}`);
            },
            error: (err) => {
              console.error('Error updating nutrition:', err);
            },
          });
        });
      },
      error: (err) => {
        console.error('Error fetching nutrition entries:', err);
      },
    });
  }

  deleteRecipe(recipeId: string): void {
    this.http.delete(`http://localhost:5000/api/recipes/${recipeId}`).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
      },
    });
  }

  cancelEditRecipe(): void {
    this.editingRecipe = null;
  }

  addNewRecipe(): void {
    if (
      this.newRecipe[' mealtype'] &&
      this.newRecipe.Title &&
      this.newRecipe.Ingredients &&
      this.newRecipe.Instructions &&
      this.newRecipe.Cleaned_Ingredients &&
      this.newRecipe.carbs !== null &&
      this.newRecipe.fat !== null &&
      this.newRecipe.protein !== null &&
      this.newRecipe.calories !== null
    ) {
      this.http.post('http://localhost:5000/api/recipes', this.newRecipe).subscribe({
        next: (response: any) => {
          this.recipes.unshift(response);
          this.resetNewRecipe();
          alert('Recipe added successfully!');
          this.loadRecipes(this.selectedMealType);
          this.notificationService.addNotification('New recipe added', response._id);
        },
        error: (err) => {
          console.error('Error adding recipe:', err);
          alert(err.error.message || 'Failed to add recipe. Please check your inputs.');
        },
      });
    } else {
      alert('Please fill all required fields.');
    }
  }

  resetNewRecipe(): void {
    this.newRecipe = {
      ' mealtype': '',
      Title: '',
      Ingredients: '',
      Instructions: '',
      Cleaned_Ingredients: '',
      calories: 0,
      carbs: null,
      fat: null,
      protein: null,
    };
  }
  goToDashboard() {
    this.router.navigate(['/login']);
  }
}