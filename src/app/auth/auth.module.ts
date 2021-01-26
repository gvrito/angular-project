import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthUsersComponent } from './auth-users/auth-users.component';
import { RegistrationModule } from '../registration/registration.module';


@NgModule({
  declarations: [LoginComponent, AuthUsersComponent, ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationModule
  ],
  exports: [
    LoginComponent,
    AuthUsersComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
