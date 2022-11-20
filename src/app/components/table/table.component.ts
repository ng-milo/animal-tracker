import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  title = 'dialog-app';

  constructor(private matDialog:MatDialog){

  }

  showDialog(){
    this.matDialog.open(TableDialogComponent,{
      width:'500px',
      data: "This is a dialog"
    });
  }
}

