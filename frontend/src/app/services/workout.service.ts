import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workout } from '../../backend/models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = 'http://localhost:5000/api/workouts';

  constructor(private http: HttpClient) {}

  getWorkouts(userId: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/${userId}`).pipe(
      catchError((err) => {
        console.error('Error fetching workouts:', err);
        return throwError(() => new Error('Failed to fetch workouts'));
      })
    );
  }

  postWorkout(workout: Workout): Observable<void> {
    return this.http.post<void>(this.apiUrl, workout).pipe(
      catchError((err) => {
        console.error('Error posting workout:', err);
        return throwError(() => new Error('Failed to post workout'));
      })
    );
  }
}