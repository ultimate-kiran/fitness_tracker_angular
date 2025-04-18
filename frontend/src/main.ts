import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
// <-- ✅ Add this
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  
    provideRouter(routes, withComponentInputBinding()),
   // provideForms() // <-- ✅ Required for [(ngModel)] to work
  ]
}).catch(err => console.error(err));
