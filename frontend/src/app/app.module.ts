import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Angular Forms
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing config
import { appConfig } from './app.config';

// Your Components
import { AddWorkoutDialogComponent } from './components/workout/add-workout-dialog/add-workout-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { HomeComponent } from './pages/home/home.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    HomeComponent,
    DashboardComponent,
    AddWorkoutDialogComponent,
    NutritionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatButtonModule,
    
  ],
  providers: [appConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
