import {Pipe, PipeTransform} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

//   transform(tasks: FormControl[], filter: FormGroup): any {
//     // filter.valueChanges.subscribe( value => {
//     if (!filter.getRawValue().toString().toLowerCase().trim()) {
//       return tasks;
//     } else {
//       return tasks.filter(task => {
//         return task.get('title').value.toString().toLowerCase().indexOf(filter.getRawValue().toString().toLowerCase()) !== -1;
//       });
//     }
//   }
}
