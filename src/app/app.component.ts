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
  newTodo: Todo = new Todo(null);
  public todos: Todo[] = [];

  constructor(private _todoDataService: TodoDataService) {
    // this._todoDataService.loadTodosFromJSON();
  }

  ngOnInit() {
    this._todoDataService.getAllTodos().subscribe(
      result => this.todos = result
    );
  }

  addTodo() {
    this._todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo(null);
  }

  toggleTodoComplete(todo) {
    this._todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this._todoDataService.deleteTodoById(todo.id);
  }

  getAllTodos() {
    return this._todoDataService.getAllTodos();
  }
}
