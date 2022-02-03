import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpwdComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    AuthModule,
    NgOtpInputModule
  ]
})
export class AccountModule { }
