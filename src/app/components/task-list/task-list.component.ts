import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {TasksService} from '../../core/services/tasks.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TaskModel} from '../../core/models/task-model';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {delay} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  // import font awesome icons
  faNoCheck = faCircle;
  faCheck = faCheckCircle;
  faEdit = faEdit;
  faDelete = faTrashAlt;
  faPlus = faPlus;
  faComplete = faCheck;
  //
  loading = true;
  formArray = new FormArray([]);
  tasks: TaskModel[] = [];
  formControl = new FormControl('');
  updateTask$ = new Subject();

  constructor(private tasksService: TasksService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.uploadTasks();
    // this.formArray.valueChanges.subscribe(value => (this.tasks = value));
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      id: '',
      title: '',
      completed: false,
      date: ''
    });
  }

  uploadTasks() {
    this.tasksService
      .getTasks()
      .pipe(delay(1500))
      .subscribe((array) => {
        const tasks = array.reduce((a, b) => a.concat(b), []);
        tasks.forEach(_ => {
          this.formArray.push(this.addFormGroup());
        });
        this.formArray.patchValue(tasks);
        this.tasks = tasks;
        this.loading = false;
      });
  }

  onAddTask() {
    this.formArray.push(this.addFormGroup());
  }

  getTaskDate(i): TaskModel {
    return this.tasks[i];
  }

  onComplete(i: number) {
    console.log(this.tasks);
    console.log(this.tasks[i].completed);
  }

  onDelete(i: number) {
    this.tasksService.onDelete(i);
    this.formArray.removeAt(i);
  }

  onEdit() {
  }

  onCompleteEdit(task: FormGroup) {
    this.updateTask$.next(task.value);
    console.log(task.value);
  }


}
