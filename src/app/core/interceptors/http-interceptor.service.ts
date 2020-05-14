import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, filter, map, finalize } from 'rxjs/operators';
import { ShareDataService } from '../../shared/service/shareData.service ';
import { Error } from '../../shared/constant/error.constant';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import * as msgActions from '../../root-store/actions/message.actions';
import { Message } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  // messageMatrixSubject = new BehaviorSubject('');
  readonly errorMsg = Error;
  msgCode: any = '';
  constructor(
    private shareDataService: ShareDataService,
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercepting request Start
    // Adding request parameters
    const authToken = 'dummy token';
    const authReq = request.clone({
      setHeaders: { Authorization: authToken }
    });
    // Intercepting request End
    this.shareDataService.loadingSubject.next(true);
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.statusInfo) { // Specific for MRDS service
            const statusMessage = event.body.statusInfo;
            Object.keys(this.errorMsg).map((key) => {
              if (key === statusMessage && statusMessage[0].code) {
                const message = new Message(key, this.errorMsg[key], '');
                this.store.dispatch(msgActions.setMessage({ message }));
                statusMessage.description = this.errorMsg[key];
                this.shareDataService.messageMatrixSubject.next(statusMessage);
              }
            });
          } else { // For other than non-MRDS service
            const statusMessage = event.body[0].statusMessage;
            if ( statusMessage ) {
              Object.keys(this.errorMsg).map((key) => {
                if (key === statusMessage && statusMessage.msgCode) {
                  const message = new Message(key, this.errorMsg[key], '');
                  this.store.dispatch(msgActions.setMessage({ message }));
                  statusMessage.description = this.errorMsg[key];
                  this.shareDataService.messageMatrixSubject.next(statusMessage);
                }
              });

            }
          }
        }
        return event;
      }),
      // catchError(this.handleError)
      catchError(( httpErrorResponse: HttpErrorResponse) => {
        if ( httpErrorResponse.status.toString().startsWith('4')
              && !httpErrorResponse.error.customers.lenght
                && httpErrorResponse.statusText.toUpperCase() === 'NOT FOUND' ) {

        }
        return throwError(httpErrorResponse);
      }),
      finalize(() => this.shareDataService.loadingSubject.next(false))
    );
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   return next.handle(req).pipe(
  //     tap(event => {
  //       console.log('01 event')
  //       if (event.type === HttpEventType.Response) {
  //         console.log('01 event')
  //         const statusMessage = event.body[0].statusMessage;
  //         if (statusMessage) {
  //           Object.keys(this.errorMsg)
  //             .map((key) => {
  //               if (key === statusMessage.msgCode) {
  //                 const message = new Message(key, this.errorMsg[key], '');
  //                 this.store.dispatch(msgActions.setMessage({ message }));

  //                 statusMessage.description = this.errorMsg[key];
  //                 this.shareDataService.messageMatrixSubject.next(statusMessage);
  //               }
  //             });
  //         }
  //       }
  //       catchError(this.handleError);
  //     })
  //   );
  // }

  handleError(error: HttpErrorResponse) {
    return throwError('Error custom');
  }
}
