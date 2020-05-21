import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetComponent } from './components/reset/reset.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { UpdateComponent } from './components/update/update.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ProfileComponent } from './components/profile/profile.component'
import {AuthGuard} from './guards/auth.guard';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';
import { IntroComponent } from './components/intro/intro.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { GroupComponent } from './components/group/group.component';

const routes: Routes = [
  {path: 'app1/login', component: LoginComponent},
  {path:'app1/register', component: RegisterComponent},
  {path:'app1/dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'app1/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'app1/update/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path:'app1/forgot', component: ForgotComponent},
  {path:'app1/reset/:token', component: ResetComponent},
  {path:'app1/email-verification/:url', component: EmailVerificationComponent},
  {path: 'app1', redirectTo: "app1/login"},
  {path:'app1/step1', component: Step1Component, canActivate:[AuthGuard]},
  {path:'app1/step2', component: Step2Component, canActivate:[AuthGuard]},
  {path:'app1/step3', component: Step3Component, canActivate:[AuthGuard]},
  {path:'app1/step4', component: Step4Component, canActivate:[AuthGuard]},
  {path:'app1/step5', component: Step5Component, canActivate:[AuthGuard]},
  {path:'app1/intro', component: IntroComponent, canActivate:[AuthGuard]},
  {path:'app1/home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'app1/images', component: ImageComponent, canActivate:[AuthGuard]},
  {path:'app1/group/:id', component: GroupComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
