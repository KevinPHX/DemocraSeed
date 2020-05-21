import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './components/group/group.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResetComponent } from './components/reset/reset.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { UpdateComponent } from './components/update/update.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: 'app2/login', component: LoginComponent},
  {path:'app2/register', component: RegisterComponent},
  {path:'app2/dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'app2/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'app2/update/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path:'app2/group/:id', component: GroupComponent, canActivate:[AuthGuard]},
  {path:'app2/forgot', component: ForgotComponent},
  {path:'app2/reset/:token', component: ResetComponent},
  {path:'app2/email-verification/:url', component: EmailVerificationComponent},
  {path: 'app2', redirectTo: "app2/login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
