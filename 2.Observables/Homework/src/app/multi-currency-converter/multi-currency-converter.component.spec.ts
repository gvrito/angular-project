import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCurrencyConverterComponent } from './multi-currency-converter.component';

describe('MultiCurrencyConverterComponent', () => {
  let component: MultiCurrencyConverterComponent;
  let fixture: ComponentFixture<MultiCurrencyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCurrencyConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
