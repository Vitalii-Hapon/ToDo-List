import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask, TaskModel} from '../models/task-model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class TasksService {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<TaskModel[]> {
    return this.http
      .get<ITask[]>(this.ROOT_URL)
      .pipe(
        map((response: ITask[]) => {
          return response.map((task) => new TaskModel(task));
        })
      );

  }


  // onDelete(id: number) {
  //   this.tasks = this.tasks.filter(item => item.id !== id);
  // }
  //
  // onComplete(id: number) {
  //   const idx = this.tasks.findIndex(item => item.id === id);
  //   this.tasks[idx].completed = !this.tasks[idx].completed;
  // }
}
