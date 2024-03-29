import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';


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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

@Injectable()
export class MapComponent implements OnInit {
  private map: any;
  private markerList: any;
  eventSubscription: Subscription;

  ngOnInit() {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 49.212730, -123.020735 ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.markerList = [];
    // Add all pigs to map
    this.getPigs().subscribe((data) => {
      let tmpMarker:any;
      let tmplongHolder:any = [];
      let tmpLatHolder: any = [];
      let tmpPosNum: any = [];
      for(let i = 0; i < data.length; i++){
        tmplongHolder.push(data[i].data.longitude) 
        tmpLatHolder.push(data[i].data.latitude);
      }
      // Check for overlapping latitude and longitudes
      for(let i = 0; i < tmplongHolder.length; i++){
        for(let j = 0; j < tmplongHolder.length; j++){
          if(i != j){
            if(tmplongHolder[i] == tmplongHolder[j] && tmpLatHolder[i] == tmpLatHolder[j]){
              tmplongHolder.splice(j, 1);
              tmpLatHolder.splice(j, 1);
              tmpPosNum.splice(j, 1);
              j = tmplongHolder.length;
            }
          }
        }
      }

      for (let i = 0; i< tmplongHolder.length; i++) {
        tmpPosNum.push(0);
      }

      for(let i = 0; i < data.length; i++){
        for (let k = 0; k< tmpPosNum.length; k++) {
          if(tmplongHolder[k] == data[i].data.longitude && tmpLatHolder[k] == data[i].data.latitude){
            tmpPosNum[k] += 1;
          }
        }
      }

      for (let i = 0; i < tmplongHolder.length; i++) {
        tmpMarker = L.marker([tmplongHolder[i], tmpLatHolder[i]]).addTo(this.map);
        this.markerList.push(tmpMarker);
        this.markerList[i].bindPopup("<b>" + tmpPosNum[i] + " pig reported.</b>");
      }
    });

    tiles.addTo(this.map);
  }

  constructor(private http: HttpClient, private sharedService:SharedService) {
    this.eventSubscription = this.sharedService.getEvent().subscribe(() => {
      this.resetMarkers();
    });
  }



  ngAfterViewInit(): void {
    this.initMap();
  }

  getPigs(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
    .pipe();
  }

  resetMarkers(): void {
    this.map.remove();
    this.initMap();
  }

}
