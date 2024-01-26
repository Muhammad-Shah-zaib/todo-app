import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  public loadingStatus: boolean = false;
  constructor() { }
}
