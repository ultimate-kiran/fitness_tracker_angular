import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../../services/nutritionhome.service';
import { NutritionService } from '../../../../services/nutrition.service';
import { AuthService } from '../../../../services/auth.service';
import { Recipe } from '../../../../../backend/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewrecipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewrecipe.component.html',
  styleUrls: ['./viewrecipe.component.css'],
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe | undefined;
  ingredientsList: string[] = [];
  instructionsList: string[] = [];
  cleanedIngredientsList: string[] = [];
  mealTypeDisplay: string = "Dinner";
  private userId: string = '';

  constructor(
    private recipeService: RecipeService,
    private nutritionService: NutritionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUserId();
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.fetchRecipeDetails(title);
      }
    });
  }

  private initializeUserId(): void {
    const id = this.authService.getLoggedInUserId();
    if (!id) {
      console.error('User not logged in');
      return;
    }
    this.userId = id;
  }

  fetchRecipeDetails(title: string): void {
    this.recipeService.getRecipeByTitle(title).subscribe({
      next: (recipe) => {
        console.log('Fetched recipe details:', recipe);
        this.recipe = recipe;
        this.parseRecipeDetails();
        this.setMealTypeDisplay();
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
        this.recipe = undefined;
      }
    });
  }

  parseRecipeDetails(): void {
    if (!this.recipe) return;

    // Parse Ingredients
    try {
      this.ingredientsList = this.recipe.Ingredients
        ? JSON.parse(this.recipe.Ingredients.replace(/'/g, '"'))
        : [];
    } catch (e) {
      console.warn('Falling back to comma-separated parsing for Ingredients:', e);
      this.ingredientsList = this.recipe.Ingredients
        ? this.recipe.Ingredients.split(',').map(item => item.trim()).filter(item => item)
        : [];
    }

    // Parse Instructions
    this.instructionsList = this.recipe.Instructions
      ? this.recipe.Instructions.split(/\.|\n/).filter(step => step.trim() !== '')
      : [];

    // Parse Cleaned_Ingredients
    try {
      this.cleanedIngredientsList = this.recipe.Cleaned_Ingredients
        ? JSON.parse(this.recipe.Cleaned_Ingredients.replace(/'/g, '"'))
        : [];
    } catch (e) {
      console.warn('Falling back to comma-separated parsing for Cleaned_Ingredients:', e);
      this.cleanedIngredientsList = this.recipe.Cleaned_Ingredients
        ? this.recipe.Cleaned_Ingredients.split(',').map(item => item.trim()).filter(item => item)
        : [];
    }
  }

  setMealTypeDisplay(): void {
    if (this.recipe && this.recipe[' mealtype']) {
      const mealType = this.recipe[' mealtype'].toLowerCase();
      this.mealTypeDisplay = mealType.charAt(0).toUpperCase() + mealType.slice(1);
    } else {
      this.mealTypeDisplay = 'Dinner';
    }
  }

  addToMealTracker(): void {
    if (this.recipe) {
      const totalCalories = this.recipe.calories || 235;
      const carbsCalories = totalCalories * 0.40;
      const proteinCalories = totalCalories * 0.30;
      const fatCalories = totalCalories * 0.30;

      const recipeData = {
        mealType: this.mealTypeDisplay,
        foodItems: this.recipe.Title,
        calories: totalCalories,
        carbs: Math.round(carbsCalories / 4),
        protein: Math.round(proteinCalories / 4),
        fat: Math.round(fatCalories / 9)
      };
      this.router.navigate(['/nutrition'], { state: { recipeData } });
    }
  }

  saveMeal(): void {
    if (!this.userId) {
      console.error('User not logged in');
      return;
    }

    if (this.recipe) {
      const totalCalories = this.recipe.calories || 235;
      const carbsCalories = totalCalories * 0.40;
      const proteinCalories = totalCalories * 0.30;
      const fatCalories = totalCalories * 0.30;

      const payload = {
        userId: this.userId,
        mealType: this.mealTypeDisplay,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        foodName: this.recipe.Title,
        calories: totalCalories,
        carbs: Math.round(carbsCalories / 4),
        protein: Math.round(proteinCalories / 4),
        fat: Math.round(fatCalories / 9),
        date: new Date().toISOString().split('T')[0]
      };

      this.nutritionService.postNutrition(payload).subscribe({
        next: () => {
          console.log('Meal saved successfully');
          this.router.navigate(['/nutrition']);
        },
        error: (err) => {
          console.error('Error saving meal:', err);
        }
      });
    }
  }
}