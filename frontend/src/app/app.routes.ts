import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { WorkoutComponent} from './components/workout1/workout1.component'
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admindashboard/admindashboard.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { NutritionhomeComponent } from './components/nutrition/nutritionhome/nutritionhome.component';
import { BreakfastComponent } from './components/nutrition/breakfast/breakfast/breakfast.component';
import { LunchComponent } from './components/nutrition/lunch/lunch/lunch.component';
import { DinnerComponent } from './components/nutrition/dinner/dinner/dinner.component';
import { ViewRecipeComponent } from './components/nutrition/viewrecipe/viewrecipe/viewrecipe.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AboutUsComponent } from './components/aboutus/aboutus.component';
//import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
// Define your routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer', component: CustomersComponent },
  { path: 'workout1', component: WorkoutComponent },
  { path :'nutrition',component:NutritionComponent},
  { path: 'userdashboard', component: UserDashboardComponent }, 
  { path: 'userdashboard/:id', component: UserDashboardComponent },// ✅ Updated path
  { path: 'exercise',component:ExerciseComponent},
  { path: 'nutritionhome',component:NutritionhomeComponent},
  { path: 'breakfast',component:BreakfastComponent},
  { path: 'lunch',component:LunchComponent},
  { path: 'dinner',component:DinnerComponent},
  { path: 'viewrecipe/:title',component:ViewRecipeComponent},
  {path: 'admindashboard',component:AdminDashboardComponent},
  {path:'notification',component:NotificationComponent},
  {path:'profile',component:UserProfileComponent},
  {path:'aboutus',component:AboutUsComponent}
];
