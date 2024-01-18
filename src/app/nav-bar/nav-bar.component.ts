import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AllTodosComponent } from '../todos/all-todos/all-todos.component';
import { FavTodosComponent } from '../todos/fav-todos/fav-todos.component';
import { CompletedTodosComponent } from '../todos/completed-todos/completed-todos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    AllTodosComponent,
    FavTodosComponent,
    CompletedTodosComponent
  ]
})
export class NavBarComponent implements OnInit {

  alltodos: boolean = false;
  favtodos: boolean = false;
  completedtodos: boolean = false;
  router: Router= inject(Router);

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor() { }

  ngOnInit(): void {
    let url = this.router.url;
    console.log(url);
    if (/\/(alltodos|home|todos|)/.test(url)){
      this.loadAllTodos();
    }else if (/\/(favtodos|favouritetodos|favrouites)/.test(url)){
      this.loadFavTodos();
    }else if (/\/(completedtodos|completed|done)/.test(url)){
      this.loadCompletedTodos();
    }
  }
  loadAllTodos(): void {
    this.alltodos = true;
    this.favtodos = false;
    this.completedtodos = false;
  }

  loadFavTodos(): void {
    this.favtodos = true;
    this.alltodos = false;
    this.completedtodos = false;
  }

  loadCompletedTodos(): void {
    this.completedtodos = true;
    this.alltodos = false;
    this.favtodos = false;
  }
}
