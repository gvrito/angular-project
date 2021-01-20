import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form/form.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './registration.component';



@NgModule({
  declarations: [FormComponent, UsersComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistrationComponent,
    FormComponent,
    UsersComponent
  ]
})
export class RegistrationModule { }
