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
  @Input() currencyList;
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
    let combos:Map<string,{currency:string, amount: number}> = new Map();
    let totalAmountArray = [];
    this.currencyForm.get('currencies').valueChanges.pipe(
      map(value=>{
        totalAmountArray = [0]
        console.log(value)
        value.forEach(val=> {
          if(val.amount != '' && val.curr!= '') {
            combos.set(val.curr+val.amount,{
              currency: val.curr,
              amount: val.amount
            })
          }
        })
        combos.forEach((val,key)=> {
          console.log(val.amount)
          this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${val.currency}&symbols=${this.resultProperties['controls'].curr.value}`)
          .pipe(
          map((value) => {
            totalAmountArray.push(val.amount*value.rates[this.resultProperties['controls'].curr.value])
            // totalAmountArray += val.amount*value.rates[this.resultProperties['controls'].curr.value]
          })
          )
          .subscribe(value => {
            console.log(totalAmountArray)
            let finalValue = totalAmountArray.reduce((acc,val)=>acc+val)
            this.resultProperties['controls'].amount.setValue(finalValue)
          });
        })
      }),
    ).subscribe()
  }

  get resultProperties(){
    return this.currencyForm.get('result')
  }

  get currencies(){
    return this.currencyForm.get('currencies') as FormArray;
  }

  getResult(){
    return this.currencyForm.get('result');
  }

  addCurrency(){
    this.currencies.push(new FormGroup({
      curr: new FormControl(''),
      amount: new FormControl('')
    }));
  }

}
