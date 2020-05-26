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

  onDelete(idx: number) {
    this.http.delete(this.ROOT_URL + `/${idx}`)
      .subscribe(response => {
        console.log(response);
      });
  }
}
