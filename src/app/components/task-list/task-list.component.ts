import {Component, OnDestroy, OnInit} from '@angular/core';
import {faCheckCircle, faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {TasksService} from '../../core/services/tasks.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faCheck, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {delay, map, takeUntil} from 'rxjs/operators';
import {ITask} from '../../core/models/task-model';
import {Observable, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit, OnDestroy {
  // import font awesome icons
  faSearch = faSearch;
  faNoCheck = faCircle;
  faCheck = faCheckCircle;
  faEdit = faEdit;
  faDelete = faTrashAlt;
  faPlus = faPlus;
  faComplete = faCheck;
  // variables
  loading = true;
  tasks: Observable<AbstractControl[]>;
  // form
  searchInput = new FormControl('');
  formArray = new FormArray([]);
  newTaskInput = this.fb.group({
    title: ['', Validators.required],
    date: ['', Validators.required],
    completed: false
  });
  // subscription: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(private tasksService: TasksService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getTasks();

    // this.searchInput.valueChanges
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe(value => {
    //     if (!value.toString().trim()) {
    //       return this.tasks;
    //     } else {
    //       return this.tasks = this.tasks
    //         .pipe(
    //         map( tasks => {
    //           return tasks.filter( task => {
    //             return task.get('title').value.toString().indexOf(value.toString().trim()) !== -1;
    //           });
    //         })); }
    //       });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      id: '',
      title: [{value: '', disabled: true}, Validators.required],
      date: [{value: '', disabled: true}, Validators.required],
      completed: false,
    });
  }

  newTaskGroup(task: ITask): FormGroup {
    return this.fb.group({
      id: `${task.id}`,
      title: [{value: `${task.title}`, disabled: true}, Validators.required],
      date: [{value: `${task.date}`, disabled: true}, Validators.required],
      completed: false,
    });
  }

  getTasks() {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(
        delay(500),
        map((tasks) => {
          tasks.forEach(_ => {
            this.formArray.push(this.addFormGroup());
          });
          this.formArray.patchValue(tasks);
          this.loading = false;
          console.log(this.formArray.controls);
          return this.formArray.controls;
        })
      );
  }

  toggleComplete(task: FormGroup) {
    this.tasksService.toggleCompleted(task.getRawValue()).subscribe(
      response => {
      }, err => console.log(err));
  }

  onAddTask(task: FormGroup) {
    this.tasksService.onAddTask(task.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
          taskResponse => {
            this.formArray.push(this.newTaskGroup(taskResponse));
            this.newTaskInput.reset();
            return this.formArray.controls;
          }, err => console.log(err));
  }

  onDelete(task: FormGroup, i: number) {
    this.tasks = this.tasksService.onDelete(task.getRawValue())
      .pipe(
        map(response => {
          return this.formArray.controls.filter(
            (item, idx) => idx !== i
          );
        }, err => console.log(err)));
  }

  // onDelete(task: FormGroup, i: number) {
  //   this.tasksService.onDelete(task.getRawValue())
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(response => {
  //       this.formArray.controls.
  //       return this.formArray.controls = this.formArray.controls.filter(
  //           (item, idx) => idx !== i
  //         );
  //       }, err => console.log(err));
  // }

  onEdit(i: number) {
    this.formArray.controls[i].enable();
  }

  onFinishEdit(task: FormGroup, i) {
    this.tasksService.onEdit(task.getRawValue())
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        response => {
          this.formArray.controls[i].get('title').disable();
          this.formArray.controls[i].get('date').disable();
        }, err => console.log(err));
  }

  taskState(value: boolean): any {
    return value ? this.faCheck : this.faNoCheck;
  }
}
