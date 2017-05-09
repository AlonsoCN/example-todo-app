import { Injectable } from '@angular/core';
import { Todo } from './todo';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoDataService {
  private TODO_URL = 'assets/api/todos.json';
  private lastId = 0;

  constructor(public _http: Http) {
  }

  addTodo(todo: Todo): any {
    if (!todo) {
      return false;
    }
    return todo;
  }

  deleteTodoById(id: number) {
    // this.todos = this.todos.filter(todo => todo.id !== id);
    return true;
  }

  updateTodoById(id: number, values: Object = {}) {
    // const todo = this.getTodoById(id);
    // if (!todo) {
    //   return null;
    // }
    // Object.assign(todo, values);
    // return todo;
  }

  getAllTodos() {
      // return this.todos;
      return this._http.get(this.TODO_URL)
                .map(result => result.json().todos.map(i => new Todo(i)));
  }

  getTodoById(id: number) {
    // return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(todo: Todo) {
    const updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }

}
