import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVICE_ASSETS_PATH } from '../../shared/config/serviceAssetsURLS';

@Injectable({
  providedIn: 'root'
})
export class MerchantProcessingService {

  constructor(private http: HttpClient) { }

  fetchProcessingType(): Observable<any> {
    return this.http.get(SERVICE_ASSETS_PATH.forprocessingType);
  }

  fetchProcessingOption(): Observable<any> {
    return this.http.get(SERVICE_ASSETS_PATH.forprocessingOption);
  }
}
