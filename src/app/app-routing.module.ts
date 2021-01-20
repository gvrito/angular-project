import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyComponent } from './currency/currency.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'converter', component: CurrencyComponent },
  { path: '', redirectTo: '/registration', pathMatch: 'full'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
