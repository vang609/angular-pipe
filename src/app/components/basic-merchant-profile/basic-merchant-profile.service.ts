import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICE_ASSETS_PATH } from '../../shared/config/serviceAssetsURLS';
import { SERVICE_URLS } from '../../shared/config/serviceURLS';
import { httpJSONOption } from '../../shared/config/httpOptions';
import { SERVICE_EXTERNAL } from '../../shared/config/serviceExternalURLS';


@Injectable({
  providedIn: 'root'
})
export class BasicMerchantProfileService {

  constructor(private http: HttpClient) { }

  fetchMerchantDetials(fetchMerchantDetials: string): Observable<any> {
    return this.http.get( SERVICE_ASSETS_PATH.forBasicMerchantProfile);
    // if ( fetchMerchantDetials ) {
    //   return this.http.post<any>( SERVICE_URLS.forBasicMerchantProfile,   );
    // }
  }

  fetchBasicMerchantDetials( params: any, entityType: string): Observable<any> {
    if ( params && entityType) {
      const url = `${SERVICE_EXTERNAL.forMRDSBasicMerchantProfile}entityType=${entityType}`;
      return this.http.post<any>( url ,  params, httpJSONOption );
    }
  }
}
