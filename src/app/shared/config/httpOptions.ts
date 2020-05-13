import { HttpHeaders } from '@angular/common/http';

export const httpMRDSOption = {
    headers: new HttpHeaders( { 
        'Content-Type': 'application/json', 'customerIdCompanyNumber': '616' } )
};

export const httpUploadFileOption = {
    observe: <'body'>'events',
    reportProgress: true
};
