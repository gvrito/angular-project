import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/registration/form/form.component';
import { UserRegService } from 'src/app/registration/user-reg.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css']
})
export class AuthUsersComponent implements OnInit {
  editableUser:{ID:number, UserData:object};
  @ViewChild(FormComponent) child:FormComponent;
  editMode = false;
  constructor(
    private auth:AuthService,
    public usersdb:UserRegService
  ) { }

  ngOnInit(): void {

  }

  logOut(){
    this.auth.logOut();
  }

  getEditedUser(id:number){
    this.editableUser = this.usersdb.users.get(id);
    this.editMode = true;
  }

  userEdit(object:object){
    this.usersdb.users.set(this.editableUser.ID,{
      'ID': this.editableUser.ID,
      'UserData': object
    });
  }

  userDeleted(id:number){
    this.usersdb.users.delete(id);
  }

  isEditable(id:number){
    return this.usersdb.userMatches(id);
  }
}
