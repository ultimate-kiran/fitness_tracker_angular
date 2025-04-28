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
  lunchRecipes: { Title: string }[] = [];

  constructor(private recipeService: RecipeService,private router: Router) {}

  ngOnInit(): void {
    this.fetchLunchRecipes();
  }

  fetchLunchRecipes(): void {
    this.recipeService.getRecipesByMealType('lunch').subscribe({
      next: (recipes) => {
        console.log('Fetched lunch recipes:', recipes);
        this.lunchRecipes = recipes.map(recipe => ({ Title: recipe.Title }));
        console.log('Processed lunch recipes:', this.lunchRecipes);
      },
      error: (err) => {
        console.error('Error fetching lunch recipes:', err);
        console.error('Error details:', err.message, err.status, err.statusText);
        this.lunchRecipes = [];
      }
    });
  }

  viewRecipe(Title: string): void {
    this.router.navigate(['/viewrecipe', Title]);
  }
}