import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form/form.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './registration.component';
import { LoaderModule } from '../loader/loader.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [FormComponent, UsersComponent, RegistrationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule
  ],
  exports: [
    RegistrationComponent,
    FormComponent,
    UsersComponent
  ]
})
export class RegistrationModule { }
