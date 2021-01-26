import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegService {
  users = new Map()
  loggedUser;
  edited = new EventEmitter();

  constructor() { }

  getUsers() {
    return this.users
  }

  checkCred(data: { email: string, password: string }) {
    let found:boolean = false;
    this.users.forEach((value, key) => {
      if (data.email === value.UserData.email) {
        if (data.password === value.UserData.password) {
          found = key;
          this.loggedUser = value.ID;
        }
      }
    })
    return found ? found : null;
  }

  userMatches(id:number){
    let ans = false;
    if(this.loggedUser === id) ans = true;
    return ans;
  }
}
