import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../app/form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Forms';
  users = new Map();
  regForm;
  editableUser;
  @ViewChild(FormComponent) child:FormComponent;
  userAdded(userData: {email: string,password: string,nickname: string,phone: string,website: string}){
    let date = new Date();
    let id = ''+date.getFullYear()+date.getMonth()+date.getDay()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds()+this.users.size;
    this.users.set(id,{
      'ID': id,
      'UserData': userData
    });
  }
  userDeleted(key){
    this.users.delete(key);
    if(this.child.editmode) {
      this.child.editmode = false;
      this.child.form.reset();
      this.child.submitBtnText = 'Register';
    }
  }

  getEditedUser(key){
    this.editableUser = this.users.get(key);
    this.child.editForm(this.editableUser);
  }
  editUser(object){
    this.users.set(this.editableUser.ID,{
      'ID': this.editableUser.ID,
      'UserData': object
    });
  }
}
