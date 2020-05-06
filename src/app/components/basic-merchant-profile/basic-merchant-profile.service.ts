import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicMerchantProfileService {

  constructor(private http: HttpClient) { }

  fetchMerchantDetials(fetchMerchantDetials: string): Observable<any> {
    return this.http.get('../../../assets/json/basic-merchant.json');
  }
}
