import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


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
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})

@Injectable()
export class PigComponent {

  
    @Input() pig: any;
    pigKey: string = "";
    @Output() delete = new EventEmitter<any>();

    constructor(private http: HttpClient, private matDialog:MatDialog, @Inject(DOCUMENT) document: Document) { 
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

  showDialog(tmp: any){
    let dialogRef = this.matDialog.open(TableDialogComponent,{
      width:'600px',
    });
    dialogRef.componentInstance.name = tmp.pig.name;
    dialogRef.componentInstance.phoneNum = tmp.pig.phoneNumber;
    dialogRef.componentInstance.date = tmp.pig.added_on;
    dialogRef.componentInstance.location = tmp.pig.location;
    dialogRef.componentInstance.notes = tmp.pig.notes;
    dialogRef.componentInstance.breed = tmp.pig.breed;
    dialogRef.componentInstance.pid = tmp.pig.pid;
    dialogRef.componentInstance.latitude = tmp.pig.latitude;
    dialogRef.componentInstance.longitude = tmp.pig.longitude;
    dialogRef.componentInstance.status = tmp.pig.status;
  }

  showReport(){
    this.matDialog.open(TableReportComponent,{
      width:'1200px',
      height: '900px',
    });
  }

  deletePig(tmp: any){
    // Get all of the pigs and search through them
    let pigList: any = [];
    this.getPig().subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        if (data[i].data.name == tmp.pig.name && data[i].data.phoneNumber == tmp.pig.phoneNumber && data[i].data.breed == tmp.pig.breed && data[i].data.pid == tmp.pig.pid && data[i].data.location == tmp.pig.location && data[i].data.notes == tmp.pig.notes && data[i].data.status == tmp.pig.status && data[i].data.latitude == tmp.pig.latitude && data[i].data.longitude == tmp.pig.longitude && data[i].data.added_on == tmp.pig.added_on && data[i].data.status == tmp.pig.status && data[i].data.latitude == tmp.pig.latitude && data[i].data.longitude == tmp.pig.longitude && data[i].data.added_on == tmp.pig.added_on && data[i].data.status == tmp.pig.status){
          this.remPig(data[i].key).subscribe((tmpdata: any) => {});
          // TODO: Still needs to delete the pig from the table
          break;
        }
      }
    });
  }

  getPig(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
      .pipe();
  }

  remPig(keyname: string): Observable<any> {
    return this.http.delete<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/" + keyname, httpOptions)
      .pipe();
  }

  addPig(pig: any): Observable<any> {
    return this.http.post<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", JSON.stringify(pig), httpOptions)
      .pipe();
  }

  changeStatus(tmp: any){
    // console.log(tmp)
    let pigList: any = [];
    this.getPig().subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        if (data[i].data.name == tmp.pig.name && data[i].data.phoneNumber == tmp.pig.phoneNumber && data[i].data.breed == tmp.pig.breed && data[i].data.pid == tmp.pig.pid && data[i].data.location == tmp.pig.location && data[i].data.notes == tmp.pig.notes && data[i].data.latitude == tmp.pig.latitude && data[i].data.longitude == tmp.pig.longitude && data[i].data.added_on == tmp.pig.added_on && data[i].data.status == tmp.pig.status && data[i].data.latitude == tmp.pig.latitude && data[i].data.longitude == tmp.pig.longitude && data[i].data.added_on == tmp.pig.added_on && data[i].data.status == tmp.pig.status){
          data[i].data.status = "RETRIEVED";
          this.remPig(data[i].key).subscribe((tmpdata: any) => {
            this.getPig().subscribe((tmpdataa: any) => {
              data[i].key = "pig"+data.length;
              this.addPig(data[i]).subscribe((tmpdatas: any) => {});
            });
          });
          tmp.pig.status = "RETRIEVED";
          break;
        }
      }
    });
  }
}
