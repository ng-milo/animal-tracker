import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordComponent } from '../password/password.component';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PasswordReportComponent } from '../password-report/password-report.component';

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
    // console.log(`parent comp: person ${evt["ind"]} has been deleted`)
    // find the person evt["ind"] and delete him or her from people
    this.pig = this.pig.filter(p=>p.name!==evt["ind"])
  }

  ngOnInit(): void {
  }

  showPasswordDialog(){
    this.matDialog.open(PasswordComponent,{
      width:'550px',
      height: '750px',
    });
  }

  showPasswordReport(){
    this.matDialog.open(PasswordReportComponent,{
      width:'550px',
      height: '750px',
    });
  }

  showDialog(){
    this.matDialog.open(TableDialogComponent,{
      width:'550px',
      height: '750px',
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

