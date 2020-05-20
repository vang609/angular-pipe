import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppShareDataService {

  constructor(private http: HttpClient) { }

  messageMatrixSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

}
