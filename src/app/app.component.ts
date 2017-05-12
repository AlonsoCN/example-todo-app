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
  }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this._todoDataService.getAll()
        .subscribe(result => this.todos = result);
  }

  addTodo() {
    // We don't want to add blank todos without titles
    if (this.newTodo.title) {
      this._todoDataService.add(this.newTodo)
        .subscribe(result => {
          this.todos.push(result);
        });
    }
    this.newTodo = new Todo(null);
  }

  toggleTodoComplete(todo: Todo) {
    this._todoDataService
      .toggleTodoComplete(todo)
      .subscribe(result => {
        if (result.status) {
          this.updateTodoById(todo.id, {
            complete: !todo.complete
          });
        }
      });
  }

  // Do I have to define void type on functions ???
  removeTodo(todo: Todo) {
    this._todoDataService
      .delete(todo)
      .subscribe(result => {
        if (result.status) {
          this.todos = this.todos.filter(t => t.id !== todo.id);
        }
      });
  }

  // use private for dev purpose?
  private updateTodoById(id: number, values: Object = {}) {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  private getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }
}
