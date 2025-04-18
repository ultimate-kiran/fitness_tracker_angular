import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-workout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: './add-workout-dialog.component.html'
})
export class AddWorkoutDialogComponent {
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddWorkoutDialogComponent>
  ) {
    this.workoutForm = this.fb.group({
      title: [''],
      duration: [''],
      intensity: ['Medium'],
      calories: [0],
      exerciseCount: [0]
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.dialogRef.close(this.workoutForm.value);
    }
  }
}
