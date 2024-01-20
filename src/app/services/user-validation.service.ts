import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userData } from '../interfaces/loginCredentials';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {
  url: string = 'http://localhost:3000/registrations/';
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  // this method will check the login credentials
  getData(): Observable<userData>{
    return this.http.get<userData>(this.url);
  }

  // this method will add a new user to the database
  addNewUser(newUser: any): void {
    this.http.post(this.url, newUser).subscribe ( ()=> {
      alert('You are registered Successfully');
      this.router.navigate(['/login']);
    }, (err) => {
      alert('Something went wrong, please try again late');
      this.router.navigate(['/login']);
    });
  }
}
