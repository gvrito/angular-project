import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/loader/loader.service';
import { UserRegService } from '../user-reg.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form;
  editmode;
  submitBtnText:string = 'Register';
  @Input() user;
  @Input() defaultValue;
  @Output() userAdded = new EventEmitter<{email: string,password: string,nickname: string,phone: string,website: string}>();
  @Output() userEdited = new EventEmitter<{email: string,password: string,nickname: string,phone: string,website: string}>();

  passwordMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('passwordConfirm').value ? null : {'mismatch' : true}
  }

  constructor(
    private userReg: UserRegService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      passwordConfirm: new FormControl('',[
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      nickname: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9,-]+$/)
      ]),
      phone: new FormControl('',[
        Validators.required,
        this.phoneValidator,
      ]),
      url: new FormControl('',[
        Validators.required,
        Validators.pattern(/(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w\-]*)?(\?.*)?/)
      ]),
      agreement: new FormControl('',Validators.required)
    }, this.passwordMatchValidator);
    if(this.defaultValue){
      this.editForm(this.defaultValue)
    }
  }
  getEmail() {
    return this.form.get('email');
  }
  getPassword() {
    return this.form.get('password');
  }
  getPasswordConf() {
    return this.form.get('passwordConfirm');
  }
  getNickname() {
    return this.form.get('nickname');
  }
  getPhone() {
    return this.form.get('phone');
  }
  getUrl() {
    return this.form.get('url');
  }
  regBtn() {
    if(this.getPassword().value === this.getPasswordConf().value) {
        if(this.getAgr().value){
          return true
        } else return false
      } else return false
  }
  getAgr() {
    return this.form.get('agreement')
  }
  phoneValidator(form) {
    if(!form.value) {
      return;
    }
    if(form.value.substring(0,4) == '+380' && form.value.length === 13 && /^[0-9]+$/.test(form.value.substring(1,13))) {
      return null;
    } else return {'phoneValidated' : false};
  }
  onSubmit() {
    if(this.form.status != 'VALID') {
      alert('Check Inputs!')
    } else {
      if(this.editmode) {
        this.userEdited.emit({
          email: this.getEmail().value,
          nickname: this.getNickname().value,
          password: this.getPassword().value,
          phone: this.getPhone().value,
          website: this.getUrl().value
        })
        this.editmode = false;
        this.form.reset();
        this.submitBtnText = 'Register';
        this.getAgr().setValue('');
        this.getAgr().enable();
        this.userReg.edited.emit();
      } else {
        this.userAdded.emit({
          email: this.form.value.email,
          nickname: this.form.value.nickname,
          password: this.form.value.password,
          phone: this.form.value.phone,
          website: this.form.value.url
        })
        this.form.reset();
      }
    }
  }
  editForm(object){
    this.submitBtnText = 'Finish Editing';
    this.editmode = true;
    this.getAgr().setValue('true');
    this.getAgr().disable();
    this.getEmail().setValue(object.UserData.email);
    this.getPassword().setValue(object.UserData.password);
    this.getNickname().setValue(object.UserData.nickname);
    this.getPhone().setValue(object.UserData.phone);
    this.getUrl().setValue(object.UserData.website);
  }
}
