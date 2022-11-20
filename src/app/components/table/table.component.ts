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

  people:any[]


  // constructor(private matDialog:MatDialog){

  // }

  // showDialog(){
  //   this.matDialog.open(TableDialogComponent,{
  //     width:'500px',
  //     data: "This is a dialog"
  //   });
  // }

  // showReport(){
  //   this.matDialog.open(TableReportComponent,{
  //     width:'1200px',
  //     height: '900px',
  //   });
  // }
}

