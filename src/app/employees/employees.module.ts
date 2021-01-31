import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';

import { EmployeesComponent } from './employees.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { CrudService } from './crud.service';
import { LoaderModule } from '../loader/loader.module';



@NgModule({
  declarations: [EmployeesComponent, EmployeeRegisterComponent, EmployeesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderModule
  ],
  exports: [
    EmployeesComponent,
    EmployeeRegisterComponent
  ],
  providers: [
    CrudService
  ]
})
export class EmployeesModule { }
