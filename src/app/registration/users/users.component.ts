import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('modal',[
      state('start',style({opacity: 0})),
      state('pop',style({opacity: 1})),
      state('finish',style({opacity: 0.1})),
      transition('start => pop', [
        animate('0.5s linear')
      ]),
      transition('pop => finish',[
        animate('0.5s linear')
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  @Input() user;
  @Input() isEditable;
  @Output() userDeleted = new EventEmitter();
  @Output() editedUser = new EventEmitter();
  delPressed = false;
  confirmation = false;
  state = 'start';

  constructor() { }

  ngOnInit(): void {
  }

  removeUser(user) {
    this.userDeleted.emit(user.key);
    this.closePopup();
  }
  editUser(key){
    this.editedUser.emit(key);
  }
  popUp(){
    this.delPressed = true;
    this.state = 'start';
    setTimeout(()=> {
      this.state = 'pop'
    },100)
  }
  closePopup(){
    this.state = 'finish';
    setTimeout(()=> {
      this.delPressed = false;
    },500)
  }

}
