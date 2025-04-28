import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Recipe {
  _id?: string;
  ' mealtype'?: string; // Added with space to match MongoDB data
  Title: string;
  Ingredients?: string;
  Instructions?: string;
  Image_Name?: string;
  Cleaned_Ingredients?: string;
  calories?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:5000/api/nutritionhome';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipesByMealType(mealtype: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/${mealtype}`);
  }

  getRecipeByTitle(title: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/title/${title}`);
  }
  
}