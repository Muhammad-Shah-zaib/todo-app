import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userData, user } from '../interfaces/loginCredentials';
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
  addNewUser(newUser: any, username: string) {
    this.http.post('http://localhost:3000/', username ).subscribe( ()=> {


      this.http.post(this.url, newUser).subscribe ( ()=> {
        alert('User Added Successfully');
        this.router.navigate(['/login']);
      }, (err) => {
        alert('An error has occured please try again late');
        this.router.navigate(['/login']);
      }
      );



    }, (err) => {
      alert('An error has occured please try again late');
      this.router.navigate(['/login']);
    });
    
  }
}
