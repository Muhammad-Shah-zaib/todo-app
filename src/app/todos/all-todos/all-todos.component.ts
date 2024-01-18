import { Component, OnInit, inject } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoData } from '../../interfaces/todo-data';
import { HttpService } from '../../services/http.service'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.css',
  standalone: true,
  imports: [CdkDrag, CdkDropList, JsonPipe]
})
export class AllTodosComponent implements OnInit {
  todos?: TodoData;

  // injecting the http service we made
  httpService: HttpService = inject(HttpService);

  ngOnInit(): void {
    // will use the http service to get the data for todos array
    this.httpService.getData().subscribe( (data: TodoData) => {
      this.todos = data;
      console.log('Before:',this.todos)

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


    // changing the whole data in the todos at db.json one by one
    if (this.todos !== undefined){
      this.todos.forEach( (todo, index) => 
        this.httpService.putData( todo, index+1).subscribe()
      ) // forEach ends here
    
    } // if ends here
  }// drop functions endss here
}
