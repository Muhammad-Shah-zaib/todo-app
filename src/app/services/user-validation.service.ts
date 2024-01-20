import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userData } from '../interfaces/loginCredentials';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {
  url: string = 'https://jsonplaceholder.typicode.com/users';

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  // this method will check if the login credentials are vald or not
  checkLoginCredentials(username: string, password: string) {
    return this.http.get<userData>(this.url).subscribe( (data) => {
      data.find( (user) => {
        return user.username === username && user.name === password;
      })
    });
  }

}
