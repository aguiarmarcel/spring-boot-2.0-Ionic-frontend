
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { API_CONFIG } from 'src/config/api.config';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor( public storage : StorageService){
    }
        

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
        if (localUser && requestToAPI) {
            const authRec = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});          
            return next.handle(authRec);
        }
        else {
            return next.handle(req)     
        }
        
    }
}

export const AuthInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}