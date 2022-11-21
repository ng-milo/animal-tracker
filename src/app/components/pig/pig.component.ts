import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})


export class PigComponent {

  
    @Input() pig: any;
    @Output() delete = new EventEmitter<any>();

    constructor(private matDialog:MatDialog) { }

    getInstr(){
      return true
    }
  
    onDelete(evt:any,ind:string){
      evt["ind"] = ind
      this.delete.emit(evt)
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
