import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private http: HttpClient) { }

  messageMatrixSubject: BehaviorSubject<any> = new BehaviorSubject(null);

}
