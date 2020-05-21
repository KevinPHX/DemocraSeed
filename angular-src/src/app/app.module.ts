import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service"
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import { DataService } from "./data.service";
import { UpdateComponent } from './components/update/update.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { FooterComponent } from './components/footer/footer.component';

import { App1SharedModule } from "../../projects/app1/src/app/app.module";
import { App2SharedModule } from "../../projects/app2/src/app/app.module";
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AdminGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'update/:id', component: UpdateComponent, canActivate:[AuthGuard]},
  {path:'forgot', component: ForgotComponent},
  {path:'reset/:token', component: ResetComponent},
  {path:'email-verification/:url', component: EmailVerificationComponent},
  {path:'termsandconditions', component: TermsandconditionsComponent},
  {path:'step1', component: Step1Component, canActivate:[AdminGuard]},
  {path:'step2', component: Step2Component, canActivate:[AdminGuard]},
  {path:'step3', component: Step3Component, canActivate:[AdminGuard]},
  {path:'step4', component: Step4Component, canActivate:[AdminGuard]},
  {path:'step5', component: Step5Component, canActivate:[AdminGuard]},


]
// export function tokenGetter() {
//   return localStorage.getItem("token");
// }

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    UpdateComponent,
    ForgotComponent,
    ResetComponent,
    EmailVerificationComponent,
    TermsandconditionsComponent,
    FooterComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FlashMessagesModule.forRoot(),
    App1SharedModule.forRoot(),
    App2SharedModule.forRoot(),
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
