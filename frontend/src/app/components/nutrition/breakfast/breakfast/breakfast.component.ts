import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../services/nutritionhome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breakfast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css'],
})
export class BreakfastComponent implements OnInit {
  breakfastRecipes: { Title: string; Image_Name: string | undefined }[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBreakfastRecipes();
  }

  fetchBreakfastRecipes(): void {
    this.recipeService.getRecipesByMealType('breakfast').subscribe({
      next: (recipes) => {
        console.log('Fetched breakfast recipes:', recipes);
        this.breakfastRecipes = recipes.map(recipe => ({
          Title: recipe.Title,
          Image_Name: recipe.Image_Name,
        }));
        console.log('Processed breakfast recipes:', this.breakfastRecipes);
      },
      error: (err) => {
        console.error('Error fetching breakfast recipes:', err);
        console.error('Error details:', err.message, err.status, err.statusText);
        this.breakfastRecipes = [];
      },
    });
  }

  viewRecipe(Title: string): void {
    this.router.navigate(['/viewrecipe', Title]);
  }

  getImagePath(imageName: string | undefined): string {
    return imageName ? `/assets/images/${imageName}.jpg` : '/assets/images/default-image.jpg';
  }
  navigateToNutritionHome(): void {
    this.router.navigate(['/nutritionhome']);
  }
}