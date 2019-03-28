
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';




export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no Interceptor");
        return next.handle(req).pipe(
            catchError(error => {
                let errorObj = error;
                if(errorObj.error ){

                   errorObj = errorObj.error;
                }
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj.error);
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