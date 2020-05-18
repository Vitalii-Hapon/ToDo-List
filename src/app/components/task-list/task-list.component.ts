import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {TasksService} from '../../core/services/tasks.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {TaskModel} from '../../core/models/task-model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  faNoCheck = faCircle;
  faCheck = faCheckCircle;
  faEdit = faEdit;
  faDelete = faTrashAlt;
  formArray = new FormArray([]);
  tasks: TaskModel[] = [];

  constructor(private tasksService: TasksService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.tasksService
      .getTasks()
      .subscribe((response) => {
        response.forEach(_ => {
          this.formArray.push(this.addFormGroup());
        });
        this.formArray.patchValue(response);
        this.tasks = response;
      });
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      id: null,
      title: 'new task',
      completed: false,
    });
  }

  getTask(index): TaskModel {
    return this.tasks[index];
  }

  onComplete(i: number) {
    // this.tasksService.onComplete(i);
    this.tasks[i].completed = !this.tasks[i].completed;
  }

  onDelete(i: number) {
    // this.tasksService.onDelete(id);
    this.formArray.removeAt(i);
  }

}
