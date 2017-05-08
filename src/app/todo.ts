export class Todo {
    id: number;
    title: string = '';
    complete: boolean = false;

    constructor(todo: Todo) {
        Object.assign(this, todo || {});
    }
}
