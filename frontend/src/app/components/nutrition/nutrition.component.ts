//nutrition.component.ts 

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionService } from '../../services/nutrition.service';
import { AuthService } from '../../services/auth.service';
import { ViewRecipeComponent } from '../nutrition/viewrecipe/viewrecipe/viewrecipe.component';
import { Router } from '@angular/router';

interface RawNutritionEntry {
  userId: string;
  mealType: string;
  time: string;
  foodName: string;   // Comma-separated string from backend
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  date: string;
}

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css'],
})
export class NutritionComponent implements OnInit {
  // For display in the Meal Tracker grid:
  isMenuOpen: boolean = false;
  meals: {
    mealType: string;
    mealTime: string;
    date: string;
    food: string[];
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }[] = [];

  // Totals for the cards at the top
  totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Controls modal visibility
  isDialogOpen = false;

  // Bound to the “Add New Meal” form
  newMeal = {
    mealType: '',
    mealTime: '',
    date: '',
    foodItems: '',
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  };

  // Messages
  successMsg = '';
  errorMsg = '';

  private userId = '';

  constructor(
    private nutritionService: NutritionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUserId();
    if (this.userId) {
      this.loadMeals();
    } this.checkForRecipeData();
  }

  private initializeUserId(): void {
    const id = this.authService.getLoggedInUserId();
    if (!id) {
      this.errorMsg = 'Please log in to view or add nutrition entries.';
      return;
    }
    this.userId = id;
  }

  private loadMeals(): void {
    this.nutritionService.getNutrition(this.userId).subscribe({
      next: (data: RawNutritionEntry[]) => {
        // Transform raw entries into UI-friendly shape
        this.meals = data.map(entry => ({
          mealType: entry.mealType,
          mealTime: entry.time,
          date: entry.date,
          food: entry.foodName.split(',').map(f => f.trim()),
          calories: entry.calories,
          carbs: entry.carbs,
          protein: entry.protein,
          fat: entry.fat
        }));
        this.calculateTotals();
        this.errorMsg = '';
      },
      error: err => {
        console.error('GET Error:', err);
        this.errorMsg = `Failed to load meals: ${err.message || 'Server error'}`;
      }
    });
  }

  private calculateTotals(): void {
    this.totals.calories = this.meals.reduce((sum, m) => sum + m.calories, 0);
    this.totals.protein = this.meals.reduce((sum, m) => sum + m.protein, 0);
    this.totals.carbs = this.meals.reduce((sum, m) => sum + m.carbs, 0);
    this.totals.fat = this.meals.reduce((sum, m) => sum + m.fat, 0);
  }

  getPercentage(amount: number, totalMacros: number): number {
    return totalMacros > 0 ? Math.round((amount / totalMacros) * 100) : 0;
  }

  handleAddMeal(): void {
    if (!this.newMeal.mealType || !this.newMeal.mealTime || !this.newMeal.foodItems || !this.newMeal.date) {
      this.errorMsg = 'Please fill in all required fields.';
      setTimeout(() => this.errorMsg = '', 3000);
      return;
    }

    const payload = {
      userId: this.userId,
      mealType: this.newMeal.mealType,
      time: this.newMeal.mealTime,
      foodName: this.newMeal.foodItems,
      calories: this.newMeal.calories,
      carbs: this.newMeal.carbs,
      protein: this.newMeal.protein,
      fat: this.newMeal.fat,
      date: this.newMeal.date
    };

    this.nutritionService.postNutrition(payload).subscribe({
      next: () => {
        this.successMsg = 'Meal added successfully!';
        this.loadMeals();
        this.closeDialog();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: err => {
        console.error('POST Error:', err);
        this.errorMsg = `Failed to add meal: ${err.error?.message || 'Invalid request'}`;
        setTimeout(() => this.errorMsg = '', 3000);
      }
    });
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.resetNewMeal();
  }

  private resetNewMeal(): void {
    this.newMeal = {
      mealType: '',
      mealTime: '',
      date: '',
      foodItems: '',
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    };
  }

  private checkForRecipeData(): void {
    const state = history.state as { recipeData?: any };
    if (state?.recipeData) {
      this.openDialog();
      this.newMeal = {
        mealType: state.recipeData.mealType,
        mealTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0],
        foodItems: state.recipeData.foodItems,
        calories: state.recipeData.calories,
        carbs: state.recipeData.carbs,
        protein: state.recipeData.protein,
        fat: state.recipeData.fat
      };
    }
  }
}