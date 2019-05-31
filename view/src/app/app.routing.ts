import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Page404Component } from './components/page-404/page-404.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainComponent },
    ]
  },
  { path: 'registration', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component }
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});

