import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'http://localhost:5000/api/exercises';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredExercises(equipment: string, muscle: string): Observable<any[]> {
    return new Observable(observer => {
      this.getExercises().subscribe(exercises => {
        const filteredExercises = exercises.filter(exercise => {
          const matchesEquipment = (equipment === "all" || equipment === exercise.equipment || equipment === "");
          const matchesMuscle = (muscle === "all" || muscle === exercise.primaryMuscle || exercise.secondaryMuscle.split(',').includes(muscle) || muscle === "");
          return matchesEquipment && matchesMuscle;
        });
        observer.next(filteredExercises);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
}