import { Component, OnInit } from '@angular/core';
import {faCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  faCompleteIcon = faCircle;
  faEdit = faEdit;
  faDelete = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
