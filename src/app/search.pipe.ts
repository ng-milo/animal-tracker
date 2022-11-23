import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pig: any[], querystring:string): any[] {
    return pig;
  }

}
