import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(people: any[], querystring:string): any[] {
    return people.filter(p=>{
      return p.name.toLowerCase().includes(querystring.toLowerCase());
    });
  }

}
