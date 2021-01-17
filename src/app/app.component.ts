import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forms';
  users = new Map();
  userAdded(userData: {email: string,password: string,nickname: string,phone: string,website: string}){
    console.log('kleee')
    this.users.set(this.users.size,{
      'ID': this.users.size,
      'UserData': userData
    });
  }
  userDeleted(key){
    this.users.delete(key);
  }
}
