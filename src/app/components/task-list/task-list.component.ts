import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {TasksService} from '../../core/services/tasks.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ITask} from '../../core/models/task-model';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {delay, switchMap} from 'rxjs/operators';

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
  // variables
  loading = true;
  disabled = true;
  tasks: ITask[] = [];
  // form
  formArray = new FormArray([]);
  newTask = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    date: new FormControl(''),
    completed: new FormControl('')
  });

  constructor(private tasksService: TasksService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.uploadTasks();
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      id: '',
      title: '',
      date: '',
      completed: false
    });
  }

  uploadTasks() {
    this.tasksService
      .getTasks()
      .pipe(delay(1500))
      .subscribe((tasks) => {
        tasks.forEach(_ => {
          this.formArray.push(this.addFormGroup());
        });
        this.formArray.patchValue(tasks);
        this.tasks = tasks;
        this.loading = false;
      });
  }

  toggleComplete(task: ITask) {
    this.tasksService.toggleCompleted(task).subscribe(
      response => {
      }, err => console.log(err));
  }

  onAddTask(task: ITask) {
    console.log(task);
    // this.formArray.push(this.addFormGroup());
  }

  onDelete(task: ITask) {
    this.tasksService.onDelete(task).subscribe(response => {
      this.formArray.controls = this.formArray.controls.filter(
        item => item.value.id !== task.id
      );
    }, err => console.log(err));
  }

  onEdit(task: ITask) {
  }

  onFinishEdit(task: ITask) {
    this.tasksService.onEdit(task).subscribe(
      response => {
      }, err => console.log(err));
  }
}
