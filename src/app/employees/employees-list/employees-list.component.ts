import { Component, OnInit } from '@angular/core';
import { CrudService, Employee } from '../crud.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees:Employee[] = [];
  pages = new Array(1);
  employeeNumber:number;
  currentPage = 1;
  isFocusMode = false;

  constructor(private crud:CrudService) { }

  ngOnInit(): void {
    this.updateList();
    this.crud.refreshList.subscribe(()=> {
      this.paginate(this.currentPage);
      this.updateList();
    });
  }

  updateList(){
    this.paginate(this.currentPage);
    this.crud.readAllEmployees().subscribe((data)=> {
      this.employeeNumber = data.length;
      this.pages = new Array(Math.ceil(this.employeeNumber / 10));
      if(this.pages.length > 1){
      }
    });
  }

  paginate(currentPage:number){
    this.crud.readPage(currentPage).subscribe((data)=> {
      this.isFocusMode = false;
      this.employees = data;
      this.currentPage = currentPage;
    })
  }

  delete(id:number){
    this.crud.removeEmployee(id).subscribe((data)=> {
      this.updateList();
    })
  }

  edit(event){
    this.crud.isEditMode.emit(event);
  }

  focusEmployee(id:number){
    this.employees = [];
    this.isFocusMode = true;
    this.crud.readEmployee(id).subscribe((data)=> {
      this.employees.push(data);
    })
  }

}
