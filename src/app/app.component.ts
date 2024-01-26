import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
<<<<<<< HEAD
=======
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarService } from './services/loading-bar.service';
>>>>>>> chekciing

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterOutlet, NavBarComponent, LoadingBarHttpClientModule, LoadingBarRouterModule],
=======
  imports: [CommonModule, RouterOutlet, NavBarComponent, LoadingBarHttpClientModule, MatProgressBarModule, LoadingBarRouterModule],
>>>>>>> chekciing
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'todo-app';
  public loadingBar: LoadingBarService = inject(LoadingBarService);
}
