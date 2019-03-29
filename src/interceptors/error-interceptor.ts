
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no Interceptor");
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorObj = error.error;
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);
                return Observable.throw(errorObj);
            })) as any;
    }
}

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}