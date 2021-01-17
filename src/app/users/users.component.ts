import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() user;
  @Output() userDeleted = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  removeUser(key) {
    this.userDeleted.emit(key);
  }

}
