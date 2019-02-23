import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** The base Data Service. */
export abstract class DataService<T> {

    headers: HttpHeaders;
    params: HttpParams;

    constructor(
        protected http: HttpClient, 
        protected baseUrl: string, 
        protected actionUrl: string) {

            const token = localStorage.getItem('spotify_token');
            this.headers = new HttpHeaders();

            this.headers = this.headers.append('Content-Type', 'application/json');
            this.headers = this.headers.append('Authorization', 'Bearer ' + token);
        }

    /**
     * @example
     * query()
     *
     * @returns A list of data of type<T>
     */
    query(params: HttpParams){
        return this.http
            .get(this.baseUrl + this.actionUrl, { headers: this.headers, params: params })
            .pipe(map(resp => resp as T[]));
    }

    /**
     * @example
     * put()
     *
     * @returns result of PUT
     */
    put(body: Object){
        console.log('in here');
        return this.http
            .put(this.baseUrl + this.actionUrl, body, { headers: this.headers })
            .subscribe((response: any) => {
                console.log(response);
            })
    }
}