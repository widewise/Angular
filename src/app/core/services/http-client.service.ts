import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, publish, refCount, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
    constructor(private http: HttpClient) {}

    getPromiseArray<T>(url: string): Promise<T[]> {
        return this.http
        .get(url)
        .toPromise()
        .then(response => response as T[])
        .catch(this.handleError);
    }

    getPromise<T>(url: string): Promise<T> {
        return this.http
        .get(url)
        .toPromise()
        .then(response => response as T)
        .catch(this.handleError);
    }

    getObservable<T>(url: string): Observable<T> {
        return this.http
        .get(url).pipe(
            retry(3),
            publish(),
            refCount(),
            catchError(this.handleError)
        );
    }

    create<T>(url: string, model: T): Promise<T> {
        const body = JSON.stringify(model);
        const options = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
          .post(url, body, options)
          .toPromise()
          .then(response => response as T)
          .catch(this.handleError);
    }

    update<T>(url: string, model: T): Promise<T> {
        const body = JSON.stringify(model);
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };

        return this.http
          .put(url, body, options)
          .toPromise()
          .then(response => response as T)
          .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
