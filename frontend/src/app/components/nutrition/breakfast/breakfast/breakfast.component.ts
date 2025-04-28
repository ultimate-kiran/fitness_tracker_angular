import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../services/nutritionhome.service';
import { Recipe } from '../../../../../backend/models/recipe.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breakfast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css'],
})
export class BreakfastComponent implements OnInit {
  breakfastRecipes: { Title: string }[] = [];

  constructor(private recipeService: RecipeService,private router: Router) {}

  ngOnInit(): void {
    this.fetchBreakfastRecipes();
  }

  fetchBreakfastRecipes(): void {
    this.recipeService.getRecipesByMealType('breakfast').subscribe({
      next: (recipes) => {
        console.log('Fetched breakfast recipes:', recipes);
        this.breakfastRecipes = recipes.map(recipe => ({ Title: recipe.Title }));
        console.log('Processed breakfast recipes:', this.breakfastRecipes);
      },
      error: (err) => {
        console.error('Error fetching breakfast recipes:', err);
        console.error('Error details:', err.message, err.status, err.statusText); // Detailed error logging
        this.breakfastRecipes = [];
      }
    });
  }

  viewRecipe(Title: string): void {
    this.router.navigate(['/viewrecipe', Title]);
  }
}