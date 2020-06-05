import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  visibility = new BehaviorSubject(false);

  constructor() {
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
