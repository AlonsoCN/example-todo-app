// import { Http, Response } from '@angular/http';
// import { Todo } from '../todo';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

// export abstract class TodoRepository {
//     private todoURL = 'assets/api/todos.json';

//     constructor(private http: Http) {}

//     getTodos(): Observable<Todo[]> {
//         return this.http.get(this.todoURL)
//                         .map(this.extractData)
//                         .catch(this.handleError);
//     }

//     private extractData(res: Response) {
//         const body = res.json();
//         return body.data || {};
//     }

//     private handleError (error: Response | any) {
//         let errMsg: string;
//         if (error instanceof Response) {
//             const body = error.json() || '';
//             const err = body.error || JSON.stringify(body);
//             errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//         } else {
//             errMsg = error.message ? error.message : error.toString();
//         }
//         console.error(errMsg);
//         return Observable.throw(errMsg);
//     }
// }
