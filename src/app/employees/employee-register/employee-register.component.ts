import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CrudService, Employee } from '../crud.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  form:FormGroup;
  editMode:boolean = false;
  buttonText:string = 'Register';
  private editingEmployeeId:number;

  constructor(private http:HttpClient, private crud:CrudService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      salary: new FormControl('',Validators.required),
      age: new FormControl('',Validators.required)
    })
    this.crud.isEditMode.subscribe((value:Employee) => {
      this.editMode = true;
      this.buttonText = 'Finish Editing';
      this.editingEmployeeId = value.id;
      this.form.get('name').setValue(value.name);
      this.form.get('salary').setValue(value.salary);
      this.form.get('age').setValue(value.age);
    })
  }

  onSubmit(){
    if(this.form.valid){
      if(this.editMode){
        this.crud.editEmployee(this.editingEmployeeId,this.form.getRawValue()).subscribe((data)=> {
          this.crud.refreshList.emit();
        });
        this.editMode = false;
        this.buttonText = 'Register';
        this.form.reset();
      } else {
        this.crud.createEmployee(this.form.getRawValue()).subscribe((data)=>{
          this.crud.refreshList.emit();
        })
        this.form.reset();
      }
    } else alert('Check Fields');
  }


}
