import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceMock {
    constructor(private http: HttpClient) { }

    getMCCIData(): Observable<any> {
        return this.http.get('../../../assets/json/mcc-data.json');
    }
}
