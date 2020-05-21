import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResetComponent } from './components/reset/reset.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { UpdateComponent } from './components/update/update.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ProfileComponent } from './components/profile/profile.component'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';
import { IntroComponent } from './components/intro/intro.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { GroupComponent } from './components/group/group.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


const providers = [ValidateService, AuthService, AuthGuard, DataService]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ResetComponent,
    ForgotComponent,
    UpdateComponent,
    EmailVerificationComponent,
    ProfileComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    IntroComponent,
    HomeComponent,
    ImageComponent,
    GroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    // Ng2SearchPipeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FilterPipeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({})
export class App1SharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}
