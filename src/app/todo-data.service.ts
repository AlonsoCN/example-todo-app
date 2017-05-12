import { Injectable } from '@angular/core';
import { Todo } from './todo';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoDataService {
  private TODO_URL = 'http://localhost:8080/api/todos';
  private lastId = 0;

  // Do I have to declare headars and options here ???
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(public _http: Http) {
  }

  getAll(): Observable<Todo[]> {
      return this._http.get(this.TODO_URL)
        .map(result => result.json().map(i => new Todo(i)));
  }

  add(todo: Todo): Observable<Todo> {
    const data = {
      title: todo.title,
      complete: todo.complete
    };
    return this._http.post(this.TODO_URL, data, this.options)
      .map(result => new Todo(result.json()));
  }

  updateById(id: Number, newData: Object = {}): Observable<{ status: Boolean }> {
    return this._http.put(this.TODO_URL + `/${id}`, newData, this.options)
      .map(result => result.json());
  }

  // delete(id: Number) { ???
  delete(todo: Todo): Observable<any> {
    return this._http.delete(this.TODO_URL + `/${todo.id}`, this.options)
      .map(result => result.json());
  }

  toggleTodoComplete(todo: Todo): Observable<any> {
    const updateTodo = this.updateById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }
}
