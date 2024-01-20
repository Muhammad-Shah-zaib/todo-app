import { Component, Input, OnInit, inject } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Root2, TodoData } from '../../interfaces/todo-data';
import { HttpService } from '../../services/http.service'
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { Router } from '@angular/router';
import { ShareUserDataService } from '../../services/share-user-data.service';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.css',
  standalone: true,
  imports: [CdkDrag, CdkDropList, JsonPipe, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule]

})
export class AllTodosComponent implements OnInit {
  // private router: Router = inject(Router);
  blur : boolean = false;
  timer: any;
  url: string = 'http://localhost:3000/tasks/'
  task: string = "";
  todo?: Root2
  searchTask: string = '';
  todos?: TodoData;
  tempTodos?: TodoData;
  // injecting the http service we made
  httpService: HttpService = inject(HttpService);
  public shareUserDataService: ShareUserDataService = inject(ShareUserDataService);

  ngOnInit(): void {
    console.log ('inside ngOnInit of all-todos.component.ts')
    // will use the http service to get the data for todos array

    // validating the user has logged in or not
    this.shareUserDataService.getState().subscribe( (data) => {
      if (data.username === undefined || data.username === null){
        console.warn('No name: ', data);
        // this.router.navigate(['/login']);
        
      }else{
      
      console.warn('inside the share_user_service');

      
        this.httpService.getData().subscribe( (data: TodoData) => {
          if (data){
            this.todos = data.filter( (todo) => todo.userId === this.shareUserDataService.id );
          }
        }) // getData subscribe ends here
      } // else ends here
    }); // shareUserDataService subscribe ends here
  } // ngOninit ends here


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
        this.tempTodos = data.filter((data) => data.userId === this.shareUserDataService.id); // a temporary data to match the ids and update the data in db.json
        
          let tempTodosId: string | undefined = this.tempTodos[i].id;
          this.httpService.putData(this.todos![i], tempTodosId).subscribe( () => {
            this.httpService.getData().subscribe( data => {this.todos = data.filter((data) => data.userId === this.shareUserDataService.id)});
          })
          
      }) // getData subscribe ends here
    } // updating the data in db.json ends here

  }// drop functions endss here`



  deleteData( id: string | undefined): void {
    console.log (id);
    this.httpService.deleteData(Number(id)).subscribe( (data: TodoData) => {

      // get the upated data from db.json
      this.httpService.getData().subscribe( (data: TodoData) => {
        this.todos = data.filter( (todo) => todo.userId === this.shareUserDataService.id );
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

  
  generateUniqueNumber(): number {
    const uniqueNumber = Math.floor(Math.random() * 100000000) + 1;
    return uniqueNumber;
  }

  addTask(): void {
    if ( this.task === '' ) return;
    this.todo = {
      id: this.generateUniqueNumber().toString(),
      userId: this.shareUserDataService.id,
      task: this.task,
      favourite: false,
      completed: false
    }

    this.task = "";    
    this.todos?.push(this.todo);

    this.httpService.postData(this.todo).subscribe( () => {
      this.httpService.getData().subscribe( (data: TodoData) => this.todos = data.filter( (todo) => todo.userId === this.shareUserDataService.id ) );
    });

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
      this.todos = data.filter( (todo) => todo.userId === this.shareUserDataService.id );
      this.todos = this.todos?.filter( (todo) => todo.task!.toLowerCase().includes(this.searchTask.toLowerCase()) );
    });
  }
  
}// ! COMPONENT ENDS HERE