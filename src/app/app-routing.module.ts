import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guard.guard';
import { LoggedGuardGuard } from './auth/logged-guard.guard';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { MovieInfoComponent } from './pages/movieInfo.component';
import { SignupComponent } from './pages/signup.component';
import { UserPageComponent } from './pages/userPage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuardGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedGuardGuard]
  },
  {
    path: 'userinfo',
    component: UserPageComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'movieinfo/:id',
    component: MovieInfoComponent,
    canActivate: [GuardGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
