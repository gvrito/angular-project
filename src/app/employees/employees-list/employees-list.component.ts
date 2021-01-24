import { Component, OnInit } from '@angular/core';
import { CrudService, Employee } from '../crud.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees:Employee[] = [];
  employeesOnPage:Employee[] = [];
  pages:number = 1;
  employeeNumber:number;
  currentPage = 1;

  constructor(private crud:CrudService) { }

  ngOnInit(): void {
    this.updateList();
    this.crud.refreshList.subscribe(()=> {
      this.updateList();
    })
  }

  updateList(){
    this.crud.readAllEmployees().subscribe((data)=> {
      this.employees = data;
      this.employeeNumber = data.length;
      this.pages = Math.ceil(this.employeeNumber / 10);
      if(this.pages > 1){
      }
    });
  }

  paginate(totalItems, currentPage){

  }

  delete(id:number){
    this.crud.removeEmployee(id).subscribe((data)=> {
      this.updateList()
    })
  }

  edit(event){
    this.crud.isEditMode.emit(event);
  }

}
