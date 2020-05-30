import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {TasksService} from '../../core/services/tasks.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {delay} from 'rxjs/operators';
import {ITask} from '../../core/models/task-model';

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
  // form
  formArray = new FormArray([]);
  newTask = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    completed: new FormControl(false),
  });

  constructor(private tasksService: TasksService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.uploadTasks();
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      id: new FormControl(''),
      title: new FormControl({value: '', disabled: true}, Validators.required),
      date: new FormControl({value: '', disabled: true}, Validators.required),
      completed: new FormControl(false),
    });
  }

  newTaskGroup(task: ITask): FormGroup {
    return this.fb.group({
      id: new FormControl(`${task.id}`),
      title: new FormControl({value: `${task.title}`, disabled: true}, Validators.required),
      date: new FormControl({value: `${task.date}`, disabled: true}, Validators.required),
      completed: new FormControl(false),
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
        this.loading = false;
      });
  }

  toggleComplete(task: FormGroup) {
    this.tasksService.toggleCompleted(task.getRawValue()).subscribe(
      response => {
      }, err => console.log(err));
  }

  onAddTask(task: FormGroup) {
    console.log(this.formArray.length);
    this.tasksService.onAddTask(task.value).subscribe(
      taskResponse => {
        this.formArray.push(this.newTaskGroup(taskResponse));
        // this.formArray.push(this.addFormGroup());
        // this.formArray.controls[length].patchValue(taskResponse);
        this.newTask.reset();
      }, err => console.log(err)
    );
  }

  onDelete(task: FormGroup, i: number) {
    this.tasksService.onDelete(task.getRawValue()).subscribe(response => {
      this.formArray.controls = this.formArray.controls.filter(
        (item, idx) => idx !== i
      );
    }, err => console.log(err));
  }

  onEdit(i: number) {
    this.formArray.controls[i].enable();
  }

  onFinishEdit(task: FormGroup, i) {
    this.tasksService.onEdit(task.getRawValue()).subscribe(
      response => {
        this.formArray.controls[i].get('title').disable();
        this.formArray.controls[i].get('date').disable();
      }, err => console.log(err));
  }
}
