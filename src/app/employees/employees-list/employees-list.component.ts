import { Component, OnInit } from '@angular/core';
import { CrudService, Employee } from '../crud.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees:Employee[];

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
    });
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
