import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent {
  // Have variables for all the fields in the dialog
  name:string = ''
  phoneNum:string = ''
  date:string = ''
  location:string = ''
  notes:string = ''
  breed:string = ''
  pid:string = ''
  latitude:string = ''
  longitude:string = ''
  status:string = ''

  constructor() {
  }

  
  ngOnInit(): void {
    document.getElementById("names")!.innerText = this.name;
    document.getElementById("phoneNumber")!.innerText = this.phoneNum;
    let tmpDate: Date = new Date(this.date);
    document.getElementById("timeDate")!.innerText = tmpDate.toDateString();
    document.getElementById("nameLocation")!.innerText = this.location;
    document.getElementById("note")!.innerText = this.notes;
    document.getElementById("pigBreed")!.innerText = this.breed;
    document.getElementById("pigId")!.innerText = this.pid;
    document.getElementById("lati")!.innerText = this.latitude;
    document.getElementById("long")!.innerText = this.longitude;
    document.getElementById("currStatus")!.innerText = this.status;
  }
}
