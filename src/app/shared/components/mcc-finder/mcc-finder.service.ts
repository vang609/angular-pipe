import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as url from '../../constant/url.constant';
import { SERVICE_ASSETS_PATH } from '../../config/serviceAssetsURLS';

@Injectable({
  providedIn: 'root'
})
export class MccFinderService {

  public $mccData = new Subject<any>();

  constructor(private http: HttpClient) { }

  getMCCDataByQueryandType(query, type): Observable<any> {
     return this.http.get( SERVICE_ASSETS_PATH.forMccFinder);
    // Updated URL - After integration
    // if (query && type) {
    //   return this.http.get(`${url.URL.MCCI_SRC}description=${query}&transProcType=${type}`);
    // }
  }

  getMCCDataByCode(code, type): Observable<any> {
    return this.http.get( SERVICE_ASSETS_PATH.forMccFinder);
    // return this.http.get(`${url.URL.MCCI_SRC}mccCode=${code}&transProcType=${type}`);
  }

  selectedMccData(data: any) {
    this.$mccData.next(data);
  }
}
