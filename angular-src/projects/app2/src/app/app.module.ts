import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
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
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { FilterPipeModule } from 'ngx-filter-pipe';

const providers = [ValidateService, AuthService, AuthGuard, DataService]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    GroupComponent,
    EmailVerificationComponent,
    ResetComponent,
    ForgotComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    FilterPipeModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({})
export class App2SharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }
  }
}
