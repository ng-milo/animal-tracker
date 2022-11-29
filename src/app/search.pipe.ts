import { Pipe, PipeTransform } from '@angular/core';

interface Pig {
  name: string;
  phoneNumber: number;
  breed: string;
  pid: number;
  location: string;
  longitude: number;
  latitude: number;
  notes: string;
  added_on: Date;
  status: string;
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pig: any[], querystring:string): any[] {
    // return pig;
    // console.log(pig);
    
    var resultArray = Object.keys(pig).map(function(personNamedIndex: any){
      let person = pig[personNamedIndex];
      // do something with person
      return person;
  });
  

    // pig = pig.sort((a, b) => a.name.localeCompare(b.name));
    

    return pig;
  }

}
