import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, query, transition, style, stagger } from 
'@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [
    trigger('spin',[
      state('start', style({transform: 'rotate(0deg)'})),
      state('finish', style({transform: 'rotate(360deg)'})),
      transition('start => finish', [
        animate('1s linear')
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {
  state = 'start';

  constructor() { }

  ngOnInit(): void {
  }

  onDone(){
    this.state = this.state === 'finish' ? 'start' : 'finish'
  }

}
