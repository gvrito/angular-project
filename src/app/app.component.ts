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
    this.users.set(this.users.size,{
      'ID': this.users.size,
      'UserData': userData
    });
  }
  userDeleted(key){
    this.users.delete(key);
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
