import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    let clonedRequest;
    const start = Date.now();
    if (req.url.includes('products')) {
      clonedRequest = req.clone();
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest)
    .pipe(
        filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
        map((event: HttpResponse<any>) => {
            if (event.url.includes('products'))
            {
                const end = Date.now();
                console.log(`Request processing time: ${end - start} msec`);
            }
            return event;
        })
    );
  }
}
