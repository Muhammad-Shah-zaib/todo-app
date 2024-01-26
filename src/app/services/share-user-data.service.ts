import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getState(): Observable<any>{
    return this.state$.asObservable();
  }
}
