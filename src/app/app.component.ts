import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Project';
  loggedIn:boolean = false;
  constructor(private log:AuthService){
    if(sessionStorage.getItem('authToken')){
      this.loggedIn = true;
    } else this.loggedIn = false;
    log.login.subscribe(()=> {
      this.loggedIn = true;
    })
    log.logout.subscribe(()=> {
      this.loggedIn = false;
    })
  }
}
