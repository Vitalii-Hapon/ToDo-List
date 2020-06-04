import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: AbstractControl[], filter: string = ''): any {
    if (!filter.toLowerCase().trim()) {
      return tasks;
    } else {
      return tasks.filter(task => {
        return task.get('title').value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
    }
  }
}
