import { Injectable } from '@angular/core';
import { Todo } from './todo';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoDataService {

  TODO_URL = 'assets/api/todos.json';
  lastId = 0;
  todos: Todo[] = [];

  constructor(public http: Http) {
  }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
      return this.todos;
  }

  getTodosFromJSON(): Observable<Todo[]> {
      return this.http.get(this.TODO_URL)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  private extractData(res: Response) {
        const body = res.json();
        return body.data.result || {};
  }

  private handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
          errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(todo: Todo) {
    const updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }

}
