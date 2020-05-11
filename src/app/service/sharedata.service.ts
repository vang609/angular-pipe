import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable()
export class SharedataService {

    private subject = new Subject<any>();
    public formValid = new Subject<any>();
    private formDataArray: Array<any> = [];

    constructor() {
    }

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    sendFormValid(data: any) {
        this.formValid.next(data);
    }

    setFormDataArray(data) {
        const formName = data.formType.routeName;
        this.formDataArray[formName] = data;
        console.log(this.formDataArray);
    }

    getFormDataArray(type) {
        const data = this.formDataArray[type];
        return data ? data : null;
    }
}
