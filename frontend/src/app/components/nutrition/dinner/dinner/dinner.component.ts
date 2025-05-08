import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../services/nutritionhome.service';
import { Recipe } from '../../../../../backend/models/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css'],
})
export class DinnerComponent implements OnInit {
  dinnerRecipes: { Title: string }[] = [];

  constructor(private recipeService: RecipeService ,private router: Router) {}

  ngOnInit(): void {
    this.fetchDinnerRecipes();
  }

  fetchDinnerRecipes(): void {
    this.recipeService.getRecipesByMealType('dinner').subscribe({
      next: (recipes) => {
        console.log('Fetched dinner recipes:', recipes);
        this.dinnerRecipes = recipes.map(recipe => ({ Title: recipe.Title }));
        console.log('Processed dinner recipes:', this.dinnerRecipes);
      },
      error: (err) => {
        console.error('Error fetching dinner recipes:', err);
        console.error('Error details:', err.message, err.status, err.statusText);
        this.dinnerRecipes = [];
      }
    });
  }

  viewRecipe(Title: string): void {
    this.router.navigate(['/viewrecipe', Title]);
  }
  navigateToNutritionHome(): void {
    this.router.navigate(['/nutritionhome']);
  }
}