import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICE_ASSETS_PATH } from '../../shared/config/serviceAssetsURLS';
import { SERVICE_URLS } from 'src/app/shared/config/serviceURLS';

@Injectable({
  providedIn: 'root'
})
export class MerchantProcessingService {

  constructor(private http: HttpClient) { }

  fetchProcessingType(dataObj: any): Observable<any> {
    return this.http.get(SERVICE_ASSETS_PATH.forprocessingType);
    // return this.http.post(SERVICE_ASSETS_PATH.forprocessingType, dataObj);

    return this.http.post("http://localhost:5000/merchantprofile/v1/listEligibleProcessingSelections", dataObj);
  }

  fetchProcessingOption(dataObj: any): Observable<any> {
     return this.http.get(SERVICE_ASSETS_PATH.forprocessingOption);
    // return this.http.post(SERVICE_ASSETS_PATH.forprocessingOption, dataObj);

    return this.http.post("http://localhost:5000/merchantprofile/v1/listEligibleProcessingSelections", dataObj);
  }

  saveMerchantProcessing(dataObj: any): Observable<any> {
    // return this.http.get(SERVICE_ASSETS_PATH.forSaveMerchantProcessing);
  //  return this.http.post(SERVICE_URLS.forSaveMerchantProcessing, dataObj);

  return this.http.post("http://localhost:5000/merchantprofile/v1/merchantprocessingprofile", dataObj);
 }
}
