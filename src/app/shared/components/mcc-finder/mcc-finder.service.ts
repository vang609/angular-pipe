import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MccFinderService {

  constructor(private http: HttpClient) { }

  getMCCIData(query, code): Observable<any> {
    return this.http.get('../../../assets/json/mcc-data.json');
    // if(code){
    //   return this.http.get(`https://localhost:44311/api/MCCInquiry/V1/merchantcategorycode?mccDescription=${query}&transProcType=${code}`);
    // } else {
    //   return this.http.get(`https://localhost:44311/api/MCCInquiry/V1/merchantcategorycode?mccDescription=${query}`);
    // }
  }
}