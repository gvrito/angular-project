import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() user;
  @Input() isEditable;
  @Output() userDeleted = new EventEmitter();
  @Output() editedUser = new EventEmitter();
  delPressed = false;
  confirmation = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeUser(user) {
    this.userDeleted.emit(user.key);
    this.delPressed = false;
  }
  editUser(key){
    this.editedUser.emit(key);
  }

}
