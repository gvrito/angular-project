import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyComponent } from './currency/currency.component';
import { EmployeesComponent } from './employees/employees.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { UserIsloggedGuard } from './auth/user-islogged.guard';
import { UserIsNotLoggedGuard } from './auth/user-is-not-logged.guard';
import { AuthUsersComponent } from './auth/auth-users/auth-users.component';
import { LoaderComponent } from './loader/loader.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/registration', pathMatch: 'full'
  },
  {
    path: 'auth', component: LoginComponent,
    canActivate:[UserIsNotLoggedGuard]
  },
  {
    path: 'users', component: AuthUsersComponent,
    canActivate: [UserIsloggedGuard]
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'converter', component: CurrencyComponent,
  },
  {
    path: 'employees', component: EmployeesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
