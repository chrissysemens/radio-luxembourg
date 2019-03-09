import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

/** The base Http Data Service. */
export abstract class HttpService<T> {

    headers: HttpHeaders;

    constructor(
        protected http: HttpClient, 
        protected baseUrl: string) {

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
    query(actionUrl: string, params?: HttpParams){

        params ? params : {};
        return this.http
            .get(this.baseUrl +  actionUrl, { headers: this.headers, params: params })
            .pipe(map(resp => resp as T[]));
    }

    /**
     * @example
     * getOne()
     *
     * @returns A list of data of type<T>
     */
    getOne(actionUrl: string, params?: HttpParams){

        params ? params : {};
        return this.http
            .get(this.baseUrl +  actionUrl, { headers: this.headers, params: params })
            .pipe(map(resp => resp as T));
    }

    /**
     * @example
     * put()
     *
     * @returns result of the PUT
     */
    put(actionUrl: string, body: Object){
        return this.http
            .put(this.baseUrl + actionUrl, body, { headers: this.headers });
    }
    
    /**
     * @example
     * post()
     *
     * @returns result of the POST
     */
    post(actionUrl: string, body: Object){
        return this.http
            .post(this.baseUrl + actionUrl, body, { headers: this.headers });
    }
}