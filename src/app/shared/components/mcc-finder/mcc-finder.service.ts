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
    return this.http.get('../../../assets/json/mcc-data1.json');
    // if (query && code) {
    //   return this.http.get(`${url.URL.MCCI_SRC}mccDescription=${query}&transProcType=${code}`);
    // }
  }
}
