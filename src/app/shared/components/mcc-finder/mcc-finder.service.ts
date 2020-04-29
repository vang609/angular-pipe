import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as url from '../../constant/url.constant';

@Injectable({
  providedIn: 'root'
})
export class MccFinderService {

  constructor(private http: HttpClient) { }

  getMCCIData(query, code): Observable<any> {
    console.log(query, code);
    return this.http.get('../../../assets/json/mcc-data1.json');
    // if (code) {
    //   return this.http.get(`${url.hostURL}${url.URL.MCCI_SRC}mccDescription=${query}&transProcType=${code}`);
    // } else {
    //   return this.http.get(`${url.hostURL}${url.URL.MCCI_SRC}mccDescription=${query}`);
    // }
  }
}
