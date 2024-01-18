import { Component, OnInit, inject } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Root2, TodoData } from '../../interfaces/todo-data';
import { HttpService } from '../../services/http.service'
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.css',
  standalone: true,
  imports: [CdkDrag, CdkDropList, JsonPipe, CommonModule,AddTaskComponent]
})
export class AllTodosComponent implements OnInit {
  todos?: TodoData;
  tempTodos?: TodoData;
  // injecting the http service we made
  httpService: HttpService = inject(HttpService);

  ngOnInit(): void {
    // will use the http service to get the data for todos array
    this.httpService.getData().subscribe( (data: TodoData) => {
      this.todos = data;
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
        this.tempTodos = data; // a temporary data to match the ids and update the data in db.json
        
          let tempTodosId: number = Number(this.tempTodos[i].id);
          this.updateData( this.todos![i], tempTodosId );
      }) // getData subscribe ends here
    } // updating the data in db.json ends here

  }// drop functions endss here`



  deleteData( id: string): void {
    console.log (id);
    this.httpService.deleteData(Number(id)).subscribe( (data: TodoData) => {

      // get the upated data from db.json
      this.httpService.getData().subscribe( (data: TodoData) => {
        this.todos = data
        console.log (this.todos);
    }) // getData subscribe ends here
  })  // deleteData subscribe ends here


  } // deleteData() ends here

  toggleFav(todo: Root2 ){
    todo.favourite = !todo.favourite;
    this.updateData(todo, Number(todo.id));
  }

  toggleComplete( todo: Root2 ){
    todo.completed = !todo.completed;
    this.updateData(todo, Number(todo.id));
  }

  updateData ( todo: Root2, id: number ){
    this.httpService.putData(todo, id).subscribe( (data: TodoData) => {
      console.log (data);
    })
  }
}// ! COMPONENT ENDS HERE