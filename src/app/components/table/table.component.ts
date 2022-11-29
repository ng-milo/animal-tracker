import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordComponent } from '../password/password.component';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import { MapComponent } from '../map/map.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PasswordReportComponent } from '../password-report/password-report.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, Routes, Event} from '@angular/router';
import { SharedService } from '../../shared.service';

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
  styleUrls: ['./table.component.css'],
})

@Injectable()
export class TableComponent implements OnInit {
  @Output() changeMap = new EventEmitter<any>();
  
  title = 'dialog-app';

  pig:Pig[]
  query: string = ""

  constructor(private http: HttpClient, private matDialog:MatDialog, private router: Router, private sharedService: SharedService) {
    this.pig = [];
    // Get number of total pigs 
    this.getPigs().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        this.pig.push(<Pig>data[i].data);
      }
    });
  }

  fixStatus(evt:any){
    this.pig = [];
    // Get number of total pigs 
    this.getPigs().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        this.pig.push(<Pig>data[i].data);
      }
    });
  }

  onPersonDelete(evt:any){
    for (let i = 0; i<this.pig.length; i++){
      if (this.pig[i].name == evt["name"] && this.pig[i].pid == evt["pid"] && this.pig[i].phoneNumber == evt["phoneNum"] && this.pig[i].breed == evt["breed"] && this.pig[i].location == evt["location"] && this.pig[i].longitude == evt["longitude"] && this.pig[i].latitude == evt["latitude"] && this.pig[i].notes == evt["notes"] && this.pig[i].status == evt["status"]){
        this.pig.splice(i,1);
      }
    }
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

  // Shows the report page!!
  showReport(){
    this.matDialog.open(TableReportComponent,{
      width:'1200px',
      height: '900px',
    }).afterClosed().subscribe(result => {
      this.pig = [];
      // Get number of total pigs 
      this.getPigs().subscribe((data) => {
        for(let i = 0; i < data.length; i++){
          this.pig.push(<Pig>data[i].data);
        }
      });
      this.sharedService.sendEvent();
    });
  }

  getPigs(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
    .pipe();
  }

  locationSort(doc:any){
    document.getElementById("theSortingTable")!.style.display = "none";
    document.getElementById("theNameTable")!.style.display = "none";
    document.getElementById("theTimeTable")!.style.display = "none";
    document.getElementById("theStatusTable")!.style.display = "none";
    document.getElementById("theLocationTable")!.style.display = "block";
  }

  nameSort(doc:any){
    document.getElementById("theSortingTable")!.style.display = "none";
    document.getElementById("theLocationTable")!.style.display = "none";
    document.getElementById("theTimeTable")!.style.display = "none";
    document.getElementById("theStatusTable")!.style.display = "none";
    document.getElementById("theNameTable")!.style.display = "block";
  }

  timeSort(doc:any){
    document.getElementById("theSortingTable")!.style.display = "none";
    document.getElementById("theNameTable")!.style.display = "none";
    document.getElementById("theLocationTable")!.style.display = "none";
    document.getElementById("theStatusTable")!.style.display = "none";
    document.getElementById("theTimeTable")!.style.display = "block";
  }

  statusSort(doc:any){
    document.getElementById("theSortingTable")!.style.display = "none";
    document.getElementById("theNameTable")!.style.display = "none";
    document.getElementById("theTimeTable")!.style.display = "none";
    document.getElementById("theLocationTable")!.style.display = "none";
    document.getElementById("theStatusTable")!.style.display = "block";
  }


  noSort = (a: any, b:any) => {
    return -1;
  }

  sortAlpha = (a: any, b:any) => {
    if(a.value.name.localeCompare(b.value.name) == 1){
      return 1;
    }
    else{
      return -1;
    }
  }

  sortLocation = (a: any, b:any) => {
    if(a.value.location.localeCompare(b.value.location) == 1){
      return 1;
    }
    else{
      return -1;
    }
  }

  sortTime = (a: any, b:any) => {
    return a.value.added_on > b.value.added_on ? 1 : -1;
  }

  sortStatus = (a: any, b:any) => {
    if(a.value.status.localeCompare(b.value.status) == 1){
      return 1;
    }
    else{
      return -1;
    }
  }


}

