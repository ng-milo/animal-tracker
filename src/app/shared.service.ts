import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();


  sendEvent() {
    this.subject.next(true);
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
