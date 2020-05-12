import { HttpHeaders } from '@angular/common/http';

export const httpJSONOption = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
};

export const httpUploadFileOption = {
    observe: <'body'>'events',
    reportProgress: true
};
