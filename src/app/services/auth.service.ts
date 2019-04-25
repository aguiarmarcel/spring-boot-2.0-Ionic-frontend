import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';
import { CartService } from './domain/cart.service';

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper(); 

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService){
    }
    
    authenticate(creds: CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string){

        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrCleanCart();
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}