import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask, TaskModel} from '../models/task-model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class TasksService {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {
  }

  //  getTasks(): Observable<TaskModel[]> {
  //     return this.http
  //       .get<ITask[]>(this.ROOT_URL)
  //       .pipe(
  //         map((response: ITask[]) => {
  //           return response.map((task) => new TaskModel(task));
  //         })
  //       );
  //   }

  getTasks(): Observable<any> {
    return this.http
      .get<any>('https://angular-organizer-8e851.firebaseio.com/.json')
      .pipe(
        map((response) => {
          return Object.values(response).map(object => {
            return Object.keys(object).map(key => ({...object[key], id: key}));
          });
        }));
  }

  onDelete(idx: number) {
    this.http.delete(this.ROOT_URL + `/${idx}`)
      .subscribe(response => {
        console.log(response);
      });
  }
}
