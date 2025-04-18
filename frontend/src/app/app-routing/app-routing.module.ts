import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes
import { HomeComponent } from '../pages/home/home.component'; // Home component
import { WorkoutComponent } from '../components/workout/workout.component';; // Workouts component
//import { WorkoutLogComponent } from '../components/workout-log/workout-log.component'; // Workout log component
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to Home page
  { path: 'workouts', component: WorkoutComponent }, // Route to Workouts page
  { path: 'dashboard', component: DashboardComponent } // Route to Workout log page
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import routing configuration
  exports: [RouterModule] // Export the RouterModule for use in other parts of the app
})
export class AppRoutingModule { }
