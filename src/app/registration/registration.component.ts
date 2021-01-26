import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';
import { UserRegService } from './user-reg.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isEditable = true;

  constructor(public userdb:UserRegService) { }

  ngOnInit(): void {
  }

  regForm;
  editableUser;
  @ViewChild(FormComponent) child:FormComponent;
  userAdded(userData: {email: string,password: string,nickname: string,phone: string,website: string}){
    let date = new Date();
    let id = ''+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds()+this.userdb.users.size;
    this.userdb.users.set(id,{
      'ID': id,
      'UserData': userData
    });
  }
  userDeleted(key){
    this.userdb.users.delete(key);
    if(this.child.editmode) {
      this.child.editmode = false;
      this.child.form.reset();
      this.child.submitBtnText = 'Register';
    }
  }

  getEditedUser(key){
    this.editableUser = this.userdb.users.get(key);
    this.child.editForm(this.editableUser);
  }
  editUser(object){
    this.userdb.users.set(this.editableUser.ID,{
      'ID': this.editableUser.ID,
      'UserData': object
    });
  }

}
