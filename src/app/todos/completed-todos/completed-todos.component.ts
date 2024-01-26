import { Component, OnInit, inject } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Root2, TodoData } from '../../interfaces/todo-data';
import { HttpService } from '../../services/http.service'
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShareUserDataService } from '../../services/share-user-data.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-completed-todos',
  standalone: true,
  templateUrl: './completed-todos.component.html',
  styleUrl: './completed-todos.component.css',
  imports: [CdkDrag, CdkDropList, JsonPipe, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule]

})
export class CompletedTodosComponent {
  timer: any;
  blur : boolean = false;
  searchTask: string = '';
  todos?: TodoData;
  tempTodos?: TodoData;

  public shareUserDataService: ShareUserDataService = inject(ShareUserDataService);
  // injecting the http service we made
  private httpService: HttpService = inject(HttpService);
  private loadingBar: LoadingBarService = inject(LoadingBarService);


  ngOnInit(): void {
   // will use the http service to get the data for todos array

    // validating the user has logged in or not
    this.shareUserDataService.getState().subscribe( (data) => {

      if (typeof(data) === 'object'){
      
        this.httpService.getData().subscribe( (data: TodoData) => {
          if (data)
            this.todos = data.filter( (data) => data.completed === true && data.userId === this.shareUserDataService.id );
          
        }) // getData subscribe ends here
      } // if ends here
    }) // shareUserDataService subscribe ends here

  }


  // Drop Method for Drag and Drop written by CDK, it is also chnging the data in db.json
  drop(event: CdkDragDrop<any>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }

  }// drop functions endss here`



  deleteData( id: string | undefined): void {
    console.log (id);
    this.httpService.deleteData(Number(id)).subscribe( (data: TodoData) => {
      this.startLoadingBar();
      // get the upated data from db.json
      this.httpService.getData().subscribe( (data: TodoData) => {
        this.todos = data.filter( (data) => data.favourite === true && data.userId === this.shareUserDataService.id );
        this.stopLoadingBar();
      }) // getData subscribe ends here
    })  // deleteData subscribe ends here
  } // deleteData() ends here

  toggleFav(todo: Root2 ){
    todo.favourite = !todo.favourite;
    this.updateData(todo, todo.id);
  }

  toggleComplete( todo: Root2 ){
    todo.completed = !todo.completed;
    this.updateData(todo, todo.id);
  }

  updateData ( todo: Root2, id: string | undefined ){
    this.httpService.putData(todo, id).subscribe( (data: TodoData) => {
    })
  }

  onSearch(event: KeyboardEvent) {
    // ignoring the special keys
    if (event.key === 'Backspace' || (event.key === 'Backspace' && event.ctrlKey)){
      this.Search();
      return;
    }
    if (event.ctrlKey || event.shiftKey || event.altKey || event.key === 'Meta' || event.key === 'Windows' || event.key === 'OS') return;
    this.blur = true;
    // Clear the previous timer
    clearTimeout(this.timer);

    // Set a new timer to perform the search after 250ms
    this.timer = setTimeout(() => {
      this.Search();
    }, 300);
  }
  Search(): void {
    this.blur = false;
    this.httpService.getData().subscribe( (data: TodoData) => {
      this.todos = data.filter( (data) => data.completed === true );
      this.todos = this.todos?.filter( (todo) => todo.task!.toLowerCase().includes(this.searchTask.toLowerCase()) );
    });
  }

  startLoadingBar(): void {
    this.blur = true;
    this.loadingBar.start();
  } // startLoadingBar() ends here

  stopLoadingBar(): void {
    this.blur = false;
    this.loadingBar.complete();
  } // stopLoadingBar() ends here
}
