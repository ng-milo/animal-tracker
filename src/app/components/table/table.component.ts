import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordComponent } from '../password/password.component';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PasswordReportComponent } from '../password-report/password-report.component';
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

@Injectable()
export class TableComponent implements OnInit {
  
  title = 'dialog-app';

  pig:Pig[]
  query: string = ""

  constructor(private http: HttpClient, private matDialog:MatDialog) {
    this.pig = [];
    // Get number of total pigs
    this.getPigs().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        this.pig.push(<Pig>data[i].data);
      }
    });
    console.log(this.pig)
    // Set this.pig to the data from the server
    // this.pig = [
    //   {
    //     name: "bobby",
    //     added_on: (new Date().getTime()),
    //     instructor: true,
    //     age: 25,
    //   },
    //   {
    //     name: "string",
    //     phoneNumber: 12345678900,
    //     breed: "string",
    //     pid: "number",
    //     location: "string",
    //     longitude: "number",
    //     latitude: "number",
    //     notes: "string",
    //     added_on: (new Date().getTime()),
    //     status: "boolean",
    //   }
    // ]
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

  getPigs(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
    .pipe();
  }

}

