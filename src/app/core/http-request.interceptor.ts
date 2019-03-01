import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from '../auth/auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


 
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    expiry_time: number; 

    constructor(private authService: AuthService) {
      this.expiry_time =  parseInt(localStorage.getItem('expiry_time'));
    }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        const now = new Date().getTime();

        if(now > this.expiry_time){
          /* Token has expired */
          const token = this.authService.refresh();

          const refreshedRequest = request.clone({
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + token
            })
          });

          return next.handle(refreshedRequest);
        }
        
        return next.handle(request);
  }
}
