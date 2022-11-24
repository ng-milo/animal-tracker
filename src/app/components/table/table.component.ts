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
  added_on: Date;
  status: string;
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
  }

  onPersonDelete(evt:any){
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

  locationSort(doc:any){
    let theTable:any = document.getElementById("theSortingTable")!.childNodes;
    let locationList:any = [];
    if (theTable != null && theTable.length > 0 && theTable[0].innerText != null){
    for (let i: number = 0; i<document.getElementById("theSortingTable")!.childNodes.length -1; i++){
      locationList.push(theTable[i].innerText.split("\n")[0]);
    }
    locationList = locationList.sort((a:string, b:string) => a.localeCompare(b));

    for (let i = 0; i< locationList.length; i++){
      for (let j = 0; j<document.getElementById("theSortingTable")!.childNodes.length -1; j++){
        if (locationList[i] == theTable[j].innerText.split("\n")[0]){
          document.getElementById("theSortingTable")!.appendChild(theTable[j]);
        }
      }
    }
  }
  }

  nameSort(doc:any){
    let theTable:any = document.getElementById("theSortingTable")!.childNodes;
    let nameList:any = [];
    if (theTable != null && theTable.length > 0 && theTable[0].innerText != null){
    for (let i: number = 0; i<document.getElementById("theSortingTable")!.childNodes.length -1; i++){
      nameList.push(theTable[i].innerText.split("\n")[1]);
    }
    nameList = nameList.sort((a:string, b:string) => a.localeCompare(b));

    for (let i = 0; i< nameList.length; i++){
      for (let j = 0; j<document.getElementById("theSortingTable")!.childNodes.length -1; j++){
        if (nameList[i] == theTable[j].innerText.split("\n")[1]){
          document.getElementById("theSortingTable")!.appendChild(theTable[j]);
        }
      }
    }
  }
  }

  timeSort(doc:any){
    let theTable:any = document.getElementById("theSortingTable")!.childNodes;
    let timeList:any = [];
    if (theTable != null && theTable.length > 0 && theTable[0].innerText != null){
    for (let i: number = 0; i<document.getElementById("theSortingTable")!.childNodes.length -1; i++){
      timeList.push(theTable[i].innerText.split("\n")[4]);
    }
    // timeList = timeList.sort((a:Date, b:Date) => (a.getTime).localeCompare(b.getTime));

    
    // timeList = timeList.sort((a: any, b: any) => {
    //   return this.getTime(a.startDate) - this.getTime(b.startDate);
    // });

    console.log(timeList[0]);

    // for (let i = 0; i< locationList.length; i++){
    //   for (let j = 0; j<document.getElementById("theSortingTable")!.childNodes.length -1; j++){
    //     if (locationList[i] == theTable[j].innerText.split("\n")[0]){
    //       document.getElementById("theSortingTable")!.appendChild(theTable[j]);
    //     }
    //   }
    // }
  }
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }


}

