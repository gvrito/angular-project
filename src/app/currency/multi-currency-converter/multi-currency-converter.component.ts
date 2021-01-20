import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { of, Subject, Subscription } from 'rxjs';
import { map, mergeMap, reduce, scan, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-multi-currency-converter',
  templateUrl: './multi-currency-converter.component.html',
  styleUrls: ['./multi-currency-converter.component.css']
})
export class MultiCurrencyConverterComponent implements OnInit {
  @Input() currencyList:Array<string>;
  currencyForm = new FormGroup({
    result: new FormGroup({
      curr: new FormControl('EUR'),
      amount: new FormControl('0')
    }),
    currencies: new FormArray([
      new FormGroup({
        curr: new FormControl(''),
        amount: new FormControl('')
      })
    ])
  })

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    let combos: Map<string, { currency: string, amount: number, finalAmount?: number }> = new Map();
    let totalAmount = 0;
    this.currencyForm.get('currencies').valueChanges.pipe(
      map(value => {
        totalAmount = 0;
        value.forEach(val => {
          if (val.amount != '' && val.curr != '') {
            if (val.curr === this.resultProperties['controls'].curr) {
              totalAmount += val.amount;
            } else {
              let final = 0;
              this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${val.curr}&symbols=${this.resultProperties['controls'].curr.value}`)
                .pipe(
                  map((value) => {
                    final = val.amount * value['rates'][this.resultProperties['controls'].curr.value];
                    totalAmount += final;
                    this.resultProperties['controls'].amount.setValue(Math.round(totalAmount*100)/100)
                  })
                )
                .subscribe();
            }
          }
        })
      }),
    ).subscribe()
  }

  get resultProperties() {
    return this.currencyForm.get('result')
  }

  get currencies() {
    return this.currencyForm.get('currencies') as FormArray;
  }

  getResult() {
    return this.currencyForm.get('result');
  }

  addCurrency() {
    this.currencies.push(new FormGroup({
      curr: new FormControl(''),
      amount: new FormControl('')
    }));
  }
  currencyValidator() {

  }

}
