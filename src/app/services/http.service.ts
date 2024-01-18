import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // injecting HttpClient
  http: HttpClient = inject(HttpClient);

  constructor() { }

  getData(): Observable<any> {
    return this.http.get("http://localhost:3000/tasks/");
  }
}
