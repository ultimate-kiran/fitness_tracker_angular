import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  selectedEquipment: string = 'All Equipment';
  selectedMuscle: string = 'All Muscles';
  exercises: any[] = [];
  filteredExercises: any[] = [];
  selectedExercise: any = null;
  searchQuery: string = '';

  equipments: string[] = ['All Equipment', 'Barbell', 'Dumbbell', 'Kettlebell', 'Machine', 'Plate', 'Resistance Band', 'Suspension', 'Other', 'None'];
  muscles: string[] = ['All Muscles', 'Abdominals', 'Abductors', 'Adductors', 'Biceps', 'Lower Back', 'Upper Back', 'Cardio', 'Chest', 'Calves', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Quadriceps', 'Shoulders', 'Triceps', 'Traps', 'Neck', 'Full Body'];

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.filterExercises();
      },
      error: (err) => {
        console.error('Error loading exercises:', err);
      }
    });
  }

  filterExercises() {
    this.filteredExercises = this.exercises.filter(exercise => {
      const matchesEquipment = (this.selectedEquipment === 'All Equipment' || this.selectedEquipment === exercise.equipment);
      const matchesMuscle = (this.selectedMuscle === 'All Muscles' || 
        this.selectedMuscle.toLowerCase() === exercise.primaryMuscle.toLowerCase() || 
        (exercise.secondaryMuscle && exercise.secondaryMuscle.split(',').some((m: string) => m.trim().toLowerCase() === this.selectedMuscle.toLowerCase())));
      const matchesSearch = this.searchQuery ? exercise.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
      return matchesEquipment && matchesMuscle && matchesSearch;
    });
  }

  onEquipmentChange() {
    this.filterExercises();
  }

  onMuscleChange() {
    this.filterExercises();
  }

  onExerciseSelectionChange(exercise: any) {
    this.filteredExercises.forEach(e => {
      if (e !== exercise) {
        e.isSelected = false;
      }
    });

    if (exercise.isSelected) {
      this.selectedExercise = exercise;
      console.log('Selected Exercise:', this.selectedExercise);
    } else {
      this.selectedExercise = null;
    }
  }

  navigateToWorkout() {
    if (this.selectedExercise) {
      // Pass selectedExercise as a query parameter (stringified JSON)
      this.router.navigate(['/workout1'], {
        queryParams: { selectedExercise: JSON.stringify(this.selectedExercise) },
        state: { selectedExercise: this.selectedExercise } // Fallback state
      });
    }
  }
}