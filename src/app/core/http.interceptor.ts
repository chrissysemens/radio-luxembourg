import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ErrorCodes } from '../enums/error-codes';
import { ErrorMessages } from '../enums/error-messages';
import { AuthService } from '../auth/auth.service';
import { TokenNames } from '../enums/token-names';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {

            const error = err.error.error;

            switch(error.status) { 
                case  ErrorCodes.FourOhOne: { 
                    if(error.message === ErrorMessages.Expired){
                        const refresh_token = localStorage.getItem(TokenNames.refresh);

                        if(refresh_token){
                            this.authService.refresh();
                        } else {
                            this.authService.authorize();
                        }

                        // Clone - Add new Headers and retry
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
