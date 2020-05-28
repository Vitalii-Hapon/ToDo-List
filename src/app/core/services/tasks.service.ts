import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask} from '../models/task-model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})


export class TasksService {
  readonly ROOT_URL = 'https://angular-organizer-8e851.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${this.ROOT_URL}.json`)
      .pipe(
        map((response) => {
          const tasksArr = [];
          Object.values(response).map(object => {
            Object.keys(object).map(key => tasksArr.push(({...object[key], id: key})));
          });
          return tasksArr;
        }));
  }

  toggleCompleted(task: ITask) {
    return this.http
      .patch<void>(`${this.ROOT_URL}/${task.date}/${task.id}.json`,
        {completed: !task.completed});
  }

  onEdit(task: ITask) {
    return this.http
      .patch<ITask>(`${this.ROOT_URL}/${task.date}/${task.id}.json`,
        {title: task.title, date: task.date});
  }

  onDelete(task: ITask) {
    return this.http
      .delete<void>(`${this.ROOT_URL}/${task.date}/${task.id}.json`);
  }
}
