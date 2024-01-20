import { Injectable } from '@angular/core';
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
    console.log ('updated the state iside service: ',this.state$);
  }

  getState(){
    return this.state$.asObservable();
  }
}
