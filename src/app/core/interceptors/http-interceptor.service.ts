import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { ShareDataService } from '../../shared/service/shareData.service ';
import { Error } from '../../shared/constant/error.constant';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import * as msgActions from '../../root-store/actions/message.actions';
import { Message } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private shareDataService: ShareDataService,
    private store: Store<AppState>) { }

  // messageMatrixSubject = new BehaviorSubject('');
  readonly errorMsg = Error;
  requestCount = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      map( event => {
        // console.log(event);
        return event;
      }),
      catchError( error => {
        return throwError( error );
      }),
      finalize( () => {
        // console.log('finalize');
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Error custom');
  }
}
