//nutrition.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Nutrition } from '../../backend/models/nutrition.model';


@Injectable({
  providedIn: 'root',
})
export class NutritionService {
  private apiUrl = 'http://localhost:5000/api/nutrition'; // Update if your backend URL is different

  constructor(private http: HttpClient) {}

  getNutrition(userId: string): Observable<Nutrition[]> {
    return this.http.get<Nutrition[]>(`${this.apiUrl}/${userId}`).pipe(
      catchError((err) => {
        console.error('Error fetching nutrition entries:', err);
        return throwError(() => new Error('Failed to fetch nutrition entries'));
      })
    );
  }

  postNutrition(nutrition: Nutrition): Observable<void> {
    return this.http.post<void>(this.apiUrl, nutrition).pipe(
      catchError((err) => {
        console.error('Error posting nutrition entry:', err);
        return throwError(() => new Error('Failed to post nutrition entry'));
      })
    );
  }
}
