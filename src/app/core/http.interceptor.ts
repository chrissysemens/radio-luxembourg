import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ErrorCodes } from '../enums/error-codes';
import { ErrorMessages } from '../enums/error-messages';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor() {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {

            const error = err.error.error;

            switch(error.status) { 
                case  ErrorCodes.FourOhOne: { 
                    if(error.message === ErrorMessages.Expired){
                        console.log('send refresh reques here');
                    }
                    break; 
                } 
                default: { 
                    break; 
                } 
            } 
        }
    }))}
}
