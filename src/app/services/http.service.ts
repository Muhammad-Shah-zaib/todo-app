import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Root2, TodoData } from '../interfaces/todo-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // injecting HttpClient
  http: HttpClient = inject(HttpClient);
  url: string = 'http://localhost:3000/tasks/'
  constructor() { }

  // getData() method returns an Observable of TodoData)
  getData(): Observable<TodoData> {
    return this.http.get<TodoData>(this.url);
  }

  // putData() method that is used to update specific task in our db.json
  putData( task: Root2, id: number ): Observable<TodoData> {
    return this.http.put<TodoData>(this.url + id, task);
  }


  // deleteData() method that is used to delete specific task in our db.json
  deleteData( id: number ): Observable<TodoData> {
    return this.http.delete<TodoData>(this.url + id);
  }

}
