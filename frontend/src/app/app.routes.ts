import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkoutComponent} from './components/workout/workout.component'
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
// Define your routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer', component: CustomersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workout', component: WorkoutComponent },
  {path :'nutrition',component:NutritionComponent},
  { path: 'userdashboard/:id', component: UserDashboardComponent }, // ✅ Updated path

];
