import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface Meal {
  id: string;
  mealType: string;
  mealTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  food: string[];
}

@Component({
  selector: 'app-nutrition',
  standalone: true, // Marks this as a standalone component
  imports: [CommonModule, FormsModule], // Imports required modules directly
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent {
  isMenuOpen = false;
  isDialogOpen = false;
  meals: Meal[] = [
    {
      id: '1',
      mealType: 'Breakfast',
      mealTime: '7:30 AM',
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 15,
      food: ['Oatmeal with berries', 'Greek yogurt', 'Honey']
    },
    {
      id: '2',
      mealType: 'Lunch',
      mealTime: '12:15 PM',
      calories: 650,
      protein: 40,
      carbs: 60,
      fat: 22,
      food: ['Grilled chicken breast', 'Quinoa', 'Roasted vegetables', 'Olive oil']
    },
    {
      id: '3',
      mealType: 'Snack',
      mealTime: '3:30 PM',
      calories: 200,
      protein: 10,
      carbs: 15,
      fat: 12,
      food: ['Mixed nuts', 'Apple']
    },
    {
      id: '4',
      mealType: 'Dinner',
      mealTime: '7:00 PM',
      calories: 580,
      protein: 35,
      carbs: 50,
      fat: 20,
      food: ['Salmon', 'Brown rice', 'Steamed broccoli', 'Lemon butter sauce']
    }
  ];
  newMeal = {
    id: '',
    mealType: '',
    mealTime: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    foodItems: ''
  };

  get totals() {
    return this.meals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }

  getPercentage(value: number, total: number): number {
    return Math.round((value / total) * 100);
  }

  handleAddMeal() {
    const newMealObj: Meal = {
      id: uuidv4(),
      mealType: this.newMeal.mealType,
      mealTime: this.newMeal.mealTime,
      calories: Number(this.newMeal.calories),
      protein: Number(this.newMeal.protein),
      carbs: Number(this.newMeal.carbs),
      fat: Number(this.newMeal.fat),
      food: this.newMeal.foodItems.split(',').map(item => item.trim())
    };
    this.meals = [newMealObj, ...this.meals];
    this.newMeal = { id: '', mealType: '', mealTime: '', calories: 0, protein: 0, carbs: 0, fat: 0, foodItems: '' };
    this.isDialogOpen = false;
    alert(`${newMealObj.mealType} has been added to your nutrition log`);
  }
}