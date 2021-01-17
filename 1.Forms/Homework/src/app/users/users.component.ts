import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() user;
  @Output() userDeleted = new EventEmitter();
  @Output() editedUser = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  removeUser(user) {
    if(confirm(`Are you Sure you want to remove this user with email ${user.value.UserData.email}?`)){
      this.userDeleted.emit(user.key);
    }
  }
  editUser(key){
    this.editedUser.emit(key);
  }

}
