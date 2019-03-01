import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
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
     * @returns result of the PUT
     */
    put(body: Object){
        console.log(this.baseUrl, this.actionUrl, body, this.headers);
        return this.http
            .put(this.baseUrl + this.actionUrl, body, { headers: this.headers });
    }
    
    /**
     * @example
     * post()
     *
     * @returns result of the POST
     */
    post(body: Object){
        return this.http
            .post(this.baseUrl + this.actionUrl, body, { headers: this.headers });
    }

    retry(request: HttpRequest<any>){
        const retry = request.clone();
    }
}