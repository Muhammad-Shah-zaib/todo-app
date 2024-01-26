import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { Observable } from 'rxjs';
>>>>>>> chekciing
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ShareUserDataService {
  public username: any = '';
  password: string = '';
  public id: string = '';
  private state$ = new BehaviorSubject<any>({});

  
  constructor() { }

  changeState(change: any){
    this.state$.next(change);
  }

<<<<<<< HEAD
  getState(){
=======
  getState(): Observable<any>{
>>>>>>> chekciing
    return this.state$.asObservable();
  }
}
