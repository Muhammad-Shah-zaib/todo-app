import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Root2, TodoData } from '../../../interfaces/todo-data';
import { HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  url: string = 'http://localhost:3000/tasks/'
  task: string = "";
  http: HttpService = inject(HttpService);
  todo?: Root2
  @Input() todoList?: TodoData;

  ngOnInit(): void {
  }
  addTask(): void {
    console.log ('task: ', this.task);
    this.todo = {
      id: String(this.todoList!.length + 1),
      task: this.task,
      favourite: false,
      completed: false
    }
    this.task = "";
    console.log ('todo: ', this.todo);
    
    this.todoList?.push(this.todo);

    console.log ('updated: ', this.todoList);

    this.http.postData(this.todo).subscribe( () => {
      this.http.getData().subscribe( (data: TodoData) => this.todoList = data );
      console.log (this.todoList)
    });

  }

}
