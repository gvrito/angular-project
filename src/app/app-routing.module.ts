import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyComponent } from './currency/currency.component';
import { EmployeesComponent } from './employees/employees.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'converter', component: CurrencyComponent },
  { path: '', redirectTo: '/registration', pathMatch: 'full'  },
  { path: 'employees', component: EmployeesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
