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

  // injecting the http service we made
  private httpService: HttpService = inject(HttpService);

  ngOnInit(): void {
    // will use the http service to get the data for todos array
    this.httpService.getData().subscribe( (data: TodoData) => {
      this.todos = data.filter( (data) => data.completed === true );
    } )

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

    // variables to store the start and end index for the data in db.json updation
    let start: number, end: number;
    // updating the data in db.json
    if ( event.previousIndex < event.currentIndex ) {
      start = event.previousIndex; 
      end = event.currentIndex;
    }else {
      start = event.currentIndex;
      end = event.previousIndex;
    }
    for (let  i: number = start; i <= end; i++){
      this.httpService.getData().subscribe( (data) => {
        this.tempTodos = data.filter( (data) => data.completed === true ); // a temporary data to match the ids and update the data in db.json
        
          let tempTodosId: string | undefined = this.tempTodos[i].id;
          this.updateData( this.todos![i], tempTodosId );
      }) // getData subscribe ends here
    } // updating the data in db.json ends here

  }// drop functions endss here`



  deleteData( id: string | undefined): void {
    console.log (id);
    this.httpService.deleteData(Number(id)).subscribe( (data: TodoData) => {

      // get the upated data from db.json
      this.httpService.getData().subscribe( (data: TodoData) => {
        this.todos = data.filter( (data) => data.completed === true );
        console.log (this.todos);
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
      console.log (data);
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
  
}
