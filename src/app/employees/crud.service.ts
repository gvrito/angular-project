import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Employee {
  name: string,
  salary: number,
  age: number,
  id?: number
}

@Injectable()
export class CrudService {
  refreshList = new EventEmitter();
  isEditMode = new EventEmitter();

  constructor(private http:HttpClient) {

  }

  createEmployee(employee:Employee){
    return this.http.post(environment.url, employee)
  }

  readEmployee(id:number){
    return this.http.get<Employee>(environment.url + '/' + id)
  }

  readAllEmployees(){
    return this.http.get<Employee[]>(environment.url)
  }

  removeEmployee(id:number){
    return this.http.delete(environment.url + '/' + id);
  }

  readPage(page:number){
    return this.http.get<Employee[]>(environment.url + '?_page=' + page +'&_limit=10')
  }


  editEmployee(id:number,employee:Employee){
    return this.http.patch(environment.url + '/' + id,employee);
  }

}
