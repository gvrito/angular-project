import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',Validators.required)
  });


  constructor(
    private auth:AuthService,
    private route:Router,
    public loaderService:LoaderService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.auth.checkUser(this.loginForm.value)
      .pipe(
        map(data => {
          if(data.authToken != ''){
            sessionStorage.setItem('authToken', data.authToken)
            sessionStorage.setItem('id', data.id)
            this.route.navigate(['/users'])
            this.auth.login.emit()
          } else alert('Email or Password is not correct')
        })
      ).subscribe()
    }
  }

  regPage(){
    this.route.navigate(['/registration'])
  }

}
