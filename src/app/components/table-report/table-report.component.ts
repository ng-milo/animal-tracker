import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

interface coordinates {
  location: string;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})

@Injectable()
export class TableReportComponent {

  onOffVar = true;
  places: Array<coordinates> = [];

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<Dialog>) {
  }

  ngOnInit() {
    
    this.places = [];
    let placeStuff = document.getElementById("reportPreviousPlace")!;
    // Get number of total pigs 
    this.getPigs().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        let tmpCoord: coordinates = {
          location: data[i].data.location,
          longitude: data[i].data.longitude,
          latitude: data[i].data.latitude,
        }
        this.places.push(tmpCoord);
        let newElement = document.createElement("option");
        newElement.setAttribute("value", data[i].data.location);
        newElement.innerHTML = data[i].data.location;
        placeStuff.appendChild(newElement);
      }
    });



  }

  getPigs(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
    .pipe();
  }

  checkInfo() {
    // Name
    let tmp:string = (<HTMLInputElement>document.getElementById("reportName")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("reportName")!).value){
      (<HTMLInputElement>document.getElementById("reportName")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("reportName")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("reportName")!).value = tmp;
    (<HTMLInputElement>document.getElementById("reportName")!).reportValidity();

    // Phone number
    tmp = (<HTMLInputElement>document.getElementById("reportNumber")!).value.replace(/[^0-9]/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("reportNumber")!).value){
      (<HTMLInputElement>document.getElementById("reportNumber")!).setCustomValidity("Please enter numbers only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("reportNumber")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("reportNumber")!).value = tmp;
    (<HTMLInputElement>document.getElementById("reportNumber")!).reportValidity();

    // Breed
    tmp = (<HTMLInputElement>document.getElementById("reportBreed")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("reportBreed")!).value){
      (<HTMLInputElement>document.getElementById("reportBreed")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("reportBreed")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("reportBreed")!).value = tmp;
    (<HTMLInputElement>document.getElementById("reportBreed")!).reportValidity();

    // pigId
    tmp = (<HTMLInputElement>document.getElementById("reportId")!).value.replace(/[^0-9]/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("reportId")!).value){
      (<HTMLInputElement>document.getElementById("reportId")!).setCustomValidity("Please enter numbers only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("reportId")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("reportId")!).value = tmp;
    (<HTMLInputElement>document.getElementById("reportId")!).reportValidity();

    // nameLocation
    tmp = (<HTMLInputElement>document.getElementById("reportNames")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("reportNames")!).value){
      (<HTMLInputElement>document.getElementById("reportNames")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("reportNames")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("reportNames")!).value = tmp;
    (<HTMLInputElement>document.getElementById("reportNames")!).reportValidity();

    // longitude
    tmp = (<HTMLInputElement>document.getElementById("reportLong")!).value.replace(/[^-.0-9]/g, '');
    tmp.replace(/^0[^.]/, '0');
    if (tmp.indexOf('-') == 0) {
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("reportLong")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
      tmp = '-' + tmp;
    }
    else{
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("reportLong")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
    }
    if (tmp.indexOf('.') != -1){ // There exists a decimal
        let count = 0;
        for (let i = 0; i<tmp.length; i++){
            if (tmp[i] == '.'){
                count += 1;
            }
        }
        if (count > 1){ // Repalces any other decimals
            // Reverse string to not mess up the first decimal
            let rev = tmp.split("").reverse().join("");
            for (let i = 0; i<count-1; i++){
                rev = rev.replace('.', '');
            }
            // Make the string back to the original
            tmp = rev.split("").reverse().join("");
        }
    }
    if (tmp != (<HTMLInputElement>document.getElementById("reportLong")!).value || (parseFloat((<HTMLInputElement>document.getElementById("reportLong")!).value)) == null) { // Display error message
      (<HTMLInputElement>document.getElementById("reportLong")!).setCustomValidity("Please ensure input only contains numbers");
      (<HTMLInputElement>document.getElementById("reportLong")!).value = tmp;
    }
    else {
      (<HTMLInputElement>document.getElementById("reportLong")!).setCustomValidity("");
    }
    (<HTMLInputElement>document.getElementById("reportLong")!).reportValidity();


    // latitude
    tmp = (<HTMLInputElement>document.getElementById("reportLati")!).value.replace(/[^-.0-9]/g, '');
    tmp.replace(/^0[^.]/, '0');
    if (tmp.indexOf('-') == 0) {
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("reportLati")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
      tmp = '-' + tmp;
    }
    else{
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("reportLati")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
    }
    if (tmp.indexOf('.') != -1){ // There exists a decimal
        let count = 0;
        for (let i = 0; i<tmp.length; i++){
            if (tmp[i] == '.'){
                count += 1;
            }
        }
        if (count > 1){ // Repalces any other decimals
            // Reverse string to not mess up the first decimal
            let rev = tmp.split("").reverse().join("");
            for (let i = 0; i<count-1; i++){
                rev = rev.replace('.', '');
            }
            // Make the string back to the original
            tmp = rev.split("").reverse().join("");
        }
    }
    if (tmp != (<HTMLInputElement>document.getElementById("reportLati")!).value || (parseFloat((<HTMLInputElement>document.getElementById("reportLati")!).value)) == null) { // Display error message
      (<HTMLInputElement>document.getElementById("reportLati")!).setCustomValidity("Please ensure input only contains numbers");
      (<HTMLInputElement>document.getElementById("reportLati")!).value = tmp;
    }
    else {
      (<HTMLInputElement>document.getElementById("reportLati")!).setCustomValidity("");
    }
    (<HTMLInputElement>document.getElementById("reportLati")!).reportValidity();

    // Dont need anything for notes

    }

  submitInfo() {
    if ((<HTMLInputElement>document.getElementById("reportName")!).value != null && (<HTMLInputElement>document.getElementById("reportNumber")!).value != null && (<HTMLInputElement>document.getElementById("reportBreed")!).value != null && (<HTMLInputElement>document.getElementById("reportId")!).value != null && (<HTMLInputElement>document.getElementById("reportNames")!).value != null && (<HTMLInputElement>document.getElementById("reportLong")!).value != null && (<HTMLInputElement>document.getElementById("reportLati")!).value != null && (<HTMLInputElement>document.getElementById("reportNotes")!).value != null) {

      this.checkInfo();
      // Needs to save time, date, and status
      // First create outlineFrame with all of the pig information inside it
      let tmpPig: Pig;
      if (this.onOffVar){
        let places = (<HTMLInputElement>document.getElementById("reportPreviousPlace")!).value
        let tmpLong: number = 0;
        let tmpLat: number = 0;
        for (let i = 0; i<this.places.length; i++){
          if (this.places[i].location == places){
            tmpLong = this.places[i].longitude;
            tmpLat = this.places[i].latitude;
          }
        }
        tmpPig = {
          name: <string>(<HTMLInputElement>document.getElementById("reportName")!).value,
          phoneNumber: Number((<HTMLInputElement>document.getElementById("reportNumber")!).value),
          breed: <string>(<HTMLInputElement>document.getElementById("reportBreed")!).value,
          pid: Number((<HTMLInputElement>document.getElementById("reportId")!).value),
          location: <string>places,
          longitude: tmpLong,
          latitude: tmpLat,
          notes: <string>(<HTMLInputElement>document.getElementById("reportNotes")!).value,
          added_on: new Date(),
          status: "READY FOR PICKUP",
        }
      }
      else {
        tmpPig = {
          name: <string>(<HTMLInputElement>document.getElementById("reportName")!).value,
          phoneNumber: Number((<HTMLInputElement>document.getElementById("reportNumber")!).value),
          breed: <string>(<HTMLInputElement>document.getElementById("reportBreed")!).value,
          pid: Number((<HTMLInputElement>document.getElementById("reportId")!).value),
          location: <string>(<HTMLInputElement>document.getElementById("reportNames")!).value,
          longitude: Number((<HTMLInputElement>document.getElementById("reportLong")!).value),
          latitude: Number((<HTMLInputElement>document.getElementById("reportLati")!).value),
          notes: <string>(<HTMLInputElement>document.getElementById("reportNotes")!).value,
          added_on: new Date(),
          status: "READY FOR PICKUP",
        }
      }
      let totalPigs: number = 0;
      this.getPig().subscribe((data) => {
        totalPigs = data.length;
        let content: outlineFrame = {
          key: "Pig" + totalPigs,
          data: tmpPig,
        }
        this.addPig(content).subscribe((data) => {});
      });
      // Refresh the table component
      
      // Close the website
      this.dialogRef.close();

    }
  }

  addPig(pig: any): Observable<any> {
    return this.http.post<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", JSON.stringify(pig), httpOptions)
      .pipe();
  }

  getPig(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
      .pipe();
  }

  switchTest(){
    // Toggle between the two states
    if (this.onOffVar == true){
      document.getElementById("locationSelector")!.style.display = "none";
      document.getElementById("newLocation")!.style.display = "flex";
      this.onOffVar = false;
    }
    else{
      document.getElementById("locationSelector")!.style.display = "block";
      document.getElementById("newLocation")!.style.display = "none";
      this.onOffVar = true;
    }
  }


}


