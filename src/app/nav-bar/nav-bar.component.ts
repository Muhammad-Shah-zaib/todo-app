import { Component, inject } from '@angular/core';
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
    AllTodosComponent
  ]
})
export class NavBarComponent {

  alltodos: boolean = false;
  favtodos: boolean = false;
  completedtodos: boolean = false;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



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
