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
  @Input() currencyList;
  constructor(public httpClient: HttpClient) { }
  
  getFirstCurrency(){
    return this.form1.get('currency1')
  }
  
  getSecondCurrency(){
    return this.form1.get('currency2')
  }
  
  getFirstValue(){
    return this.form1.get('value1')
  }
  
  getSecondValue(){
    return this.form1.get('value2')
  
  }
  ngOnInit(): void {
    this.form1 = new FormGroup({
      currency1: new FormControl(),
      value1: new FormControl(),
      currency2: new FormControl(),
      value2: new FormControl()
    })
    // console.log(this.form1)
    this.getFirstValue().valueChanges.subscribe(val=>{
      let from = this.getFirstCurrency().value;
      let to = this.getSecondCurrency().value;
      this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
      .pipe(
        map((value:{rates:{}}) => {
          let rate = value.rates[to];
          this.getSecondValue().setValue(this.getFirstValue().value*rate)
        })
      )
      .subscribe();
    })
    this.getSecondValue().valueChanges.subscribe(val => {
      let from = this.getFirstCurrency().value;
      let to = this.getSecondCurrency().value;
      this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${to}&symbols=${from}`)
      .pipe(
        map((value:{rates:{}}) => {
          let rate = value.rates[from];
          this.getFirstValue().setValue(this.getSecondValue().value*rate)
        })
      )
      .subscribe();
    })
  }

  

  getCurrency() {
    // this.form1.valueChanges.subscribe(val =>{
    //   let from = this.getFirstCurrency().value;
    //   let to = this.getSecondCurrency().value;
    //   this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
    //   .pipe(
    //     map(value => {
    //       let rate = value.rates[to];
    //       this.getSecondValue().setValue(this.getFirstValue().value*rate)
    //     })
    //   )
    //   .subscribe();
    // })
    // this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${to}&symbols=${from}`)
    // .pipe(
    //   map(value => {
    //     let rate = value.rates[to];
    //     this.getFirstValue().setValue(this.getSecondValue().value*rate)
    //   })
    // )
    // .subscribe()
}
}
