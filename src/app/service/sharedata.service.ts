import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedataService {

    public $formValid = new Subject<any>();
    public $activeStep = new Subject<any>();
    public $rStepper = new Subject<any>();
    public $dbaLenError = new Subject<any>();
    public $saveFormData = new Subject<any>();
    private $subject = new Subject<any>();
    private formDataArray: Array<any> = [];
    formSubmitSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    formSuccessSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    public DBALen;
    mccCode;

    constructor() {
    }

    sendMessage(message: string) {
        this.$subject.next({ text: message });
    }

    clearMessage() {
        this.$subject.next();
    }

    getMessage(): Observable<any> {
        return this.$subject.asObservable();
    }

    sendFormValid(data: any) {
        this.$formValid.next(data);
    }

    saveFData() {
        this.$saveFormData.next();
    }

    sendDbaError(data) {
        this.$dbaLenError.next(data);
    }

    resetStepper() {
        this.formDataArray = [];
        this.$rStepper.next();
    }

    setDBALen(val) {
        this.DBALen = val;
    }

    setFormDataArray(data) {
        this.formDataArray[data.formType.routeName] = data;
    }

    getFormDataArray(type) {
        const data = this.formDataArray[type];
        return data ? data : null;
    }

    setMccCode(code) {
        this.mccCode = code;
    }

    getMccCode() {
        return this.mccCode;
    }
}
