import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  form1;
  firstChanged:Boolean;
  secondChanged:Boolean;
  @Input() currencyList;
  constructor(public httpClient: HttpClient) { }
  
  getFirstFormGr(){
    return this.form1.get('topForm');
  }
  
  getSecondFormGr(){
    return this.form1.get('bottomForm');
  }
  
  ngOnInit(): void {
    this.form1 = new FormGroup({
      topForm: new FormGroup({
        currency1: new FormControl('USD'),
        value1: new FormControl('0'),
      }),
      bottomForm: new FormGroup({
        currency2: new FormControl('EUR'),
        value2: new FormControl('0')
      })
    })
    console.log(this.getFirstFormGr())
    this.getFirstFormGr().valueChanges.subscribe(val=> {
      if(!this.getFirstFormGr().pristine){
        this.getSecondFormGr().markAsPristine();
        let from = this.getFirstFormGr().controls.currency1.value;
        let to = this.getSecondFormGr().controls.currency2.value;
        this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
        .pipe(
          map((value:{rates:{}}) => {
            let rate = value.rates[to];
            this.getSecondFormGr().controls.value2.setValue((this.getFirstFormGr().controls.value1.value*rate).toFixed(2))
          })
        )
        .subscribe();
      }
    })
    this.getSecondFormGr().valueChanges.subscribe(val=> {
      if(!this.getSecondFormGr().pristine){
        this.getFirstFormGr().markAsPristine();
        let from = this.getFirstFormGr().controls.currency1.value;
        let to = this.getSecondFormGr().controls.currency2.value;
        this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${to}&symbols=${from}`)
        .pipe(
          map((value:{rates:{}}) => {
            let rate = value.rates[from];
            this.getFirstFormGr().controls.value1.setValue((this.getSecondFormGr().controls.value2.value*rate).toFixed(2))
          })
        )
        .subscribe();
      }
    })
  }

  

  switchButton(){
    let firstCurr = this.getFirstFormGr().controls.currency1.value;
    let firstValue = this.getFirstFormGr().controls.value1.value;
    let secondCurr = this.getSecondFormGr().controls.currency2.value;
    let secondValue = this.getSecondFormGr().controls.value2.value;
    this.getFirstFormGr().controls.currency1.setValue(secondCurr);
    this.getSecondFormGr().controls.currency2.setValue(firstCurr);
    this.getSecondFormGr().controls.value2.setValue(firstValue);
    this.getFirstFormGr().controls.value1.setValue(secondValue);

  }
}
