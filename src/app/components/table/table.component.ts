import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  title = 'dialog-app';

  pig:any[]
  query: string = ""

  constructor(private matDialog:MatDialog) {
    this.pig = [
      {
        name: "bobby",
        added_on: (new Date().getTime()),
        instructor: true,
        age: 25,
      },
      {
        name: "string",
        phoneNumber: 12345678900,
        breed: "string",
        pid: "number",
        location: "string",
        longitude: "number",
        latitude: "number",
        notes: "string",
        added_on: (new Date().getTime()),
        status: "boolean",
      }
    ]
  }

  onPersonDelete(evt:any){
    console.log(`parent comp: person ${evt["ind"]} has been deleted`)
    // find the person evt["ind"] and delete him or her from people
    this.pig = this.pig.filter(p=>p.name!==evt["ind"])
  }

  ngOnInit(): void {
  }

  showDialog(){
    this.matDialog.open(TableDialogComponent,{
      width:'500px',
      data: "This is a dialog"
    });
  }

  showReport(){
    this.matDialog.open(TableReportComponent,{
      width:'1200px',
      height: '900px',
    });
  }

}

