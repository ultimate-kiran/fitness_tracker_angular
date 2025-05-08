import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../services/nutritionhome.service';
import { Recipe } from '../../../../../backend/models/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lunch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css'],
})
export class LunchComponent implements OnInit {
  lunchRecipes: { Title: string; Image_Name: string | undefined }[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchLunchRecipes();
  }

  fetchLunchRecipes(): void {
    this.recipeService.getRecipesByMealType('lunch').subscribe({
      next: (recipes: Recipe[]) => {
        console.log('Fetched lunch recipes:', recipes);
        this.lunchRecipes = recipes.map(recipe => {
          const mappedRecipe = {
            Title: recipe.Title,
            Image_Name: recipe.Image_Name,
          };
          console.log(`Recipe: ${recipe.Title}, Image_Name: ${recipe.Image_Name}, Image Path: ${this.getImagePath(recipe.Image_Name)}`);
          return mappedRecipe;
        });
        console.log('Processed lunch recipes:', this.lunchRecipes);
      },
      error: (err) => {
        console.error('Error fetching lunch recipes:', err);
        console.error('Error details:', err.message, err.status, err.statusText);
        this.lunchRecipes = [];
      },
    });
  }

  viewRecipe(Title: string): void {
    this.router.navigate(['/viewrecipe', Title]);
  }

  getImagePath(imageName: string | undefined): string {
    if (!imageName) {
      return '/assets/images/default-image.jpg';
    }
    // Append .jpg if the imageName does not already have an extension
    const hasExtension = /\.(jpg|jpeg|png|gif)$/i.test(imageName);
    return hasExtension ? `/assets/images/${imageName}` : `/assets/images/${imageName}.jpg`;
  }
  navigateToNutritionHome(): void {
    this.router.navigate(['/nutritionhome']);
  }
}