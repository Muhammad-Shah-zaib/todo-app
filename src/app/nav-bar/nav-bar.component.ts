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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { RouterLink, RouterOutlet } from '@angular/router';
=======
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
>>>>>>> chekciing

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
    CompletedTodosComponent,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    RouterLink,
<<<<<<< HEAD
    RouterOutlet
=======
    RouterOutlet,
    RouterLinkActive
>>>>>>> chekciing
  ]
})
export class NavBarComponent implements OnInit {
  selectedTheme: string = '';
  router: Router= inject(Router);

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor() { }

  ngOnInit(): void {
<<<<<<< HEAD
    let url = this.router.url;
    if (/\/(allTodos)/.test(url)){
      this.loadAllTodos();
    }else if (/\/(favouriteTodos)/.test(url)){
      console.warn('favTodos');
      this.loadFavTodos();
    }else if (/\/(completedTodos)/.test(url)){
      this.loadCompletedTodos();
    }
  }
  loadAllTodos(): void {
    this.alltodos = true;
    this.favtodos = false;
    this.completedtodos = false;
=======
    // this.router.navigate(['/home/alltodos']);

    document.getElementById('alltodos')?.click();
>>>>>>> chekciing
  }




  changeTheme() {
    console.log ('selected:', this.selectedTheme)
  }
}
