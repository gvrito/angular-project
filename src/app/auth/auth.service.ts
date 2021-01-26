import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserRegService } from '../registration/user-reg.service';

@Injectable()
export class AuthService {
  login = new EventEmitter();
  logout = new EventEmitter();

  constructor(
    private userdb:UserRegService,
    private route: Router
    ) { }

  checkUser(data:{email:string,password:string}){
    let response = this.userdb.checkCred(data);
    return response ? of({invalid: false, authToken: '735ffjAABiwqsn865', id: response}) : of({invalid: true, authToken: '', id: ''})
  }

  userIsLoggedIn(): boolean{
    const token = sessionStorage.getItem('authToken')
    return token ? true : false
  }

  logOut(){
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id');
    this.logout.emit();
    this.route.navigate(['auth'])
  }
}
