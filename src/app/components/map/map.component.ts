import { Component } from '@angular/core';
import * as L from 'leaflet';
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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

@Injectable()
export class MapComponent {
  private map: any;
  private markerList: any;

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
      for(let i = 0; i < data.length; i++){
        tmpMarker = L.marker([data[i].data.latitude, data[i].data.longitude]).addTo(this.map);
        tmpMarker.bindPopup("<b>" + data[i].data.notes + "</b>");
        this.markerList.push(tmpMarker);
      }
    });

    tiles.addTo(this.map);
  }

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getPigs(): Observable<any> {
    return this.http.get<any>("https://272.selfip.net/apps/2ngwvpOmxG/collections/Pig/documents/", httpOptions)
    .pipe();
  }

  resetMarkers(): void {
    for(let i = 0; i < this.markerList.length; i++){
      this.map.removeLayer(this.markerList[i]);
    }
    this.markerList = [];
    this.getPigs().subscribe((data) => {
      let tmpMarker:any;
      for(let i = 0; i < data.length; i++){
        tmpMarker = L.marker([data[i].data.latitude, data[i].data.longitude]).addTo(this.map);
        tmpMarker.bindPopup("<b>" + data[i].data.notes + "</b>");
        this.markerList.push(tmpMarker);
      }
    });
  }

}
