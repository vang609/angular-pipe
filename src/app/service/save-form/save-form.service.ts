import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SERVICE_ASSETS_PATH } from '../../shared/config/serviceAssetsURLS';
import { SERVICE_URLS } from 'src/app/shared/config/serviceURLS';

@Injectable({
  providedIn: 'root'
})
export class SaveFormService {

  constructor(private http: HttpClient) { }

  saveURL(type) {
    switch (type) {
      case 1:
        return '';
      case 2:
        return SERVICE_URLS.saveProcessingProfile;
      case 3:
        return SERVICE_URLS.saveAccountFeatures;
      case 4:
        return SERVICE_URLS.saveEquipment;
      case 5:
        return SERVICE_URLS.savePricing;
      case 6:
        return SERVICE_URLS.saveSummary;
      case 7:
        return SERVICE_URLS.saveProposalDocumentPage;
    }
  }

  saveForm(dataObj: any): Observable<any> {
    if (dataObj) {
      const sendObj = dataObj.send;
      const path = this.saveURL(dataObj.formType.name);
      // return this.http.get(`SERVICE_ASSETS_PATH.${path}`);
      // return this.http.post(`SERVICE_URLS.${path}`, sendObj);

      // return this.http.post('http://localhost:5000/merchantprofile/v1/merchantprocessingprofile', sendObj);
      return of({
        result: null,
        // validationRules: [
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E01',
        //     title: null,
        //     detail: 'Sum of % B to B transactions and % B to C transactions must be equal to 100',
        //     source: null
        //   },
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E03',
        //     title: null,
        //     detail: 'Sum of % Card Present and % Card Not Present must be equal to 100.',
        //     source: null
        //   },
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E07',
        //     title: null,
        //     detail: 'Invalid Processing Option(Internet) based on Processing Type selection.',
        //     source: null
        //   },
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E13',
        //     title: null,
        //     detail: 'Annual Discover Volume should be 3% of Annual Visa/MC Volume',
        //     source: null
        //   },
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E14',
        //     title: null,
        //     detail: 'Annual Amex Volume should be equal to Annual Visa/MC Volume multiplied by Volume Percent Amex for MCC code selected',
        //     source: null
        //   },
        //   {
        //     status: 401,
        //     type: 'Error',
        //     code: 'MO-E16',
        //     title: null,
        //     detail: 'Grand Total should be Summation of Annual Visa/MC Volume, Annual Discover Volume, Annual Amex Volume and Annual Estimated PIN Debit Volume.',
        //     source: null
        //   }
        // ],
        statusCode: 200,
        message: 'Merchant Profile Validation failed.!'
      });
    }

  }
}
