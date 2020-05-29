import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask, ITaskId} from '../models/task-model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})


export class TasksService {
  readonly ROOT_URL = 'https://angular-todo-list-53593.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${this.ROOT_URL}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
        }));
  }

  toggleCompleted(task: ITask) {
    return this.http
      .patch<void>(`${this.ROOT_URL}/${task.id}.json`,
        {completed: !task.completed});
  }

  onEdit(task: ITask) {
    return this.http
      .patch<ITask>(`${this.ROOT_URL}/${task.id}.json`,
        {title: task.title, date: task.date});
  }

  onDelete(task: ITask) {
    return this.http
      .delete<void>(`${this.ROOT_URL}/${task.id}.json`);
  }

  onAddTask(task: ITask) {
    return this.http
      .post<ITaskId>(`${this.ROOT_URL}.json`, task)
      .pipe(map(response => {
        return {...task, id: response.name};
      }));
  }
}
