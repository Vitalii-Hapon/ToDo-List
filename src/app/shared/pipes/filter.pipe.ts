import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasksControls: Observable<AbstractControl[]>, filter: FormControl): void {

    // filter.valueChanges.subscribe(value => {
    //   if (!value.toLocaleString().trim()) {
    //     return tasks;
    //   } else {
    //     return tasks;
        // return tasks.pipe(map( tasks => tasks.filter( task => {
        //   return task.get('title').value.toString().indexOf(filter.toString().trim()) !== -1; })));
          // .pipe(
          //   map(tasks => {
          //     tasks.filter( task => {
          //       return task.get('title').value.toString().indexOf(filter.toString().trim()) !== -1;
          //     });
          //   }));
  //     }
  //   });
  }
}
