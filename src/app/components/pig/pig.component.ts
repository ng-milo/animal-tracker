import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Fxfdw2XfGZAwwnzzPQNVCwcfuu7d2x'
  })
};

interface outlineFrame {
  key: string;
  data: Pig;
}

interface Pig {
  name: string;
  phoneNumber: number;
  breed: string;
  pid: number;
  location: string;
  longitude: number;
  latitude: number;
  notes: string;
  added_on: number;
  status: boolean;
}

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})

@Injectable()
export class PigComponent {

  
    @Input() pig: any;
    @Output() delete = new EventEmitter<any>();

    constructor(private http: HttpClient, private matDialog:MatDialog) { 
    }

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
    let dialogRef = this.matDialog.open(TableDialogComponent,{
      width:'600px',
      data: "This is a dialog"
    });
    console.log(document.getElementById('date')!.innerText);

    dialogRef.componentInstance.name = document.getElementById("name")!.innerText;
    dialogRef.componentInstance.phoneNum = document.getElementById("pNumber")!.innerText;
    dialogRef.componentInstance.date = document.getElementById("date")!.innerText;
    dialogRef.componentInstance.location = document.getElementById("location")!.innerText;
    dialogRef.componentInstance.notes = document.getElementById("notes")!.innerText;
    dialogRef.componentInstance.breed = document.getElementById("breed")!.innerText;
    dialogRef.componentInstance.pid = document.getElementById("pid")!.innerText;
    dialogRef.componentInstance.latitude = document.getElementById("latitude")!.innerText;
    dialogRef.componentInstance.longitude = document.getElementById("longitude")!.innerText;
    dialogRef.componentInstance.status = document.getElementById("status")!.innerText;
  }

  showReport(){
    this.matDialog.open(TableReportComponent,{
      width:'1200px',
      height: '900px',
    });
  }
}
