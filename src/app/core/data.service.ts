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
            console.log(token);
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
        console.log(params);
        console.log(this.headers);
        return this.http
            .get(this.baseUrl + this.actionUrl, { headers: this.headers, params: params })
            .pipe(map(resp => resp as T[]));
    }
}