import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoData } from '../interfaces/todo-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // injecting HttpClient
  http: HttpClient = inject(HttpClient);

  constructor() { }

  // getData() method returns an Observable of TodoData)
  getData(): Observable<TodoData> {
    return this.http.get<TodoData>('http://localhost:3000/tasks/');
  }

}
