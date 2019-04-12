
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { FieldMessage } from 'src/models/fieldmessage';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(public storage : StorageService, 
                public navCtrl : NavController,
                public alertCtrl : AlertController){ 
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorObj = error.error;
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403;             
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break;    
                    default:
                        this.handleDefaultError(errorObj);    
                }  
                return Observable.throw(errorObj);
            })) as any;
    }

    async handleDefaultError(errorObj){
        let alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            subHeader: '',
            message: errorObj.message,
            buttons:[
                {
                    text: 'OK'
                }
            ]    
        });
        await alert.present();
    }

    async handle401(){
        let alert = await this.alertCtrl.create({
            header: 'Erro 401: falha de autenticação.',
            subHeader: '',
            message: 'Email ou senha incorretos.',
            buttons:[
                {
                    text: 'OK'
                }
            ]    
        });
        await alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    async handle422(errorObj){
        let alert = await this.alertCtrl.create({
            header: 'Error 422: Validação',
            message: this.listErrors(errorObj.errors),
            buttons:[
                {
                    text: 'OK'
                }
            ] 
        });
        await alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i = 0; i < messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }  
        return s;
    }
    
}

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}