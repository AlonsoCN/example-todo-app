import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {
  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  ngOnInit() {
    //this.todoDataService.getAllTodos();
    //this.todos();
    this.loadData();
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

  loadData() {
    this.todoDataService.getTodosFromJSON()
                        .subscribe(
                            function(response) { console.log('Success Response', response)},
                            function(error) { console.log('Error happened' + error)},
                            function() { console.log('the subscription is completed')}
                        );
  }
}
