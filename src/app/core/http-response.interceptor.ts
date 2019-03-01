import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ErrorCodes } from '../enums/error-codes';
import { ErrorMessages } from '../enums/error-messages';
import { TokenService } from '../token/token.service';
import { TokenNames } from '../enums/token-names';

import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
 
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {

            const error = err.error.error;

            switch(error.status) { 
                case  ErrorCodes.FourOhOne: { 
                    if(error.message === ErrorMessages.Expired){

                        const refresh_token = localStorage.getItem(TokenNames.refresh);
                        let token = localStorage.getItem(TokenNames.refresh);

                        if(refresh_token){
                            token = this.tokenService.refresh();
                        } else {
                            token = this.tokenService.authorize();
                        }

                        const refreshedRequest = request.clone({
                          headers: new HttpHeaders({
                            'Content-Type':  'application/json',
                            'Authorization': 'Bearer ' + token
                          })
                        });
              
                        return next.handle(refreshedRequest);
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
