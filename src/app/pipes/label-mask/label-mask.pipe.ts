import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelMask'
})
export class LabelMaskPipe implements PipeTransform {

  transform(value: any): any {
    if(value != null && value.length > 4 ) {
      let length = value.length;
      let mask = "*".repeat(length-4);
      let result = mask.concat(value.substr(length-4,length));
      return result;
    }
  }

}
