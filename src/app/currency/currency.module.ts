import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { MultiCurrencyConverterComponent } from './multi-currency-converter/multi-currency-converter.component';
import { CurrencyComponent } from './currency.component';



@NgModule({
  declarations: [CurrencyConverterComponent, MultiCurrencyConverterComponent, CurrencyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CurrencyConverterComponent,
    MultiCurrencyConverterComponent,
    CurrencyComponent
  ]
})
export class CurrencyModule { }
