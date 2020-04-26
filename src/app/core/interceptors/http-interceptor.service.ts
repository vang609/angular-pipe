import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  // messageMatrixSubject = new BehaviorSubject('');
  readonly errorMsg = Error;
  constructor(  private shareDataService: ShareDataService,
                private store: Store<AppState> ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {          
          let statusMessage = event.body[0].statusMessage;
          if (statusMessage) {
            Object.keys(this.errorMsg)
              .map((key) => {
                if (key === statusMessage.msgCode) {
                  
                  const message = new Message( key, this.errorMsg[key], '');
                  this.store.dispatch( msgActions.setMessage( { message } ) );

                  statusMessage.msgDescription = this.errorMsg[key];
                  this.shareDataService.messageMatrixSubject.next(statusMessage);
                }
              });
          }
        }
        catchError(this.handleError);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Error custom');
  }
}
