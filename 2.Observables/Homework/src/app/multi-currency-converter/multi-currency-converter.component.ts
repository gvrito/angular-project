import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-multi-currency-converter',
  templateUrl: './multi-currency-converter.component.html',
  styleUrls: ['./multi-currency-converter.component.css']
})
export class MultiCurrencyConverterComponent implements OnInit {
  @Input() currencyList;
  currencyForm = new FormGroup({
    result: new FormControl,
    currencies: new FormArray([
      new FormControl('')
    ])
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.getCurrencies())
  }

  getCurrencies(){
    return this.currencyForm.get('currencies') as FormArray;
  }

  getResult(){
    return this.currencyForm.get('result');
  }

  addCurrency(){
    this.getCurrencies().push(new FormControl(''));
    console.log(this.getCurrencies())
    console.log(this.currencyForm)
    console.log(this.currencyList)
  }

}
