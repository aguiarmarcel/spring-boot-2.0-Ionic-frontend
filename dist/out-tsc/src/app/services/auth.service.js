import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';
import { CartService } from './domain/cart.service';
var AuthService = /** @class */ (function () {
    function AuthService(http, storage, cartService) {
        this.http = http;
        this.storage = storage;
        this.cartService = cartService;
        this.jwtHelper = new JwtHelper();
    }
    AuthService.prototype.authenticate = function (creds) {
        return this.http.post(API_CONFIG.baseUrl + "/login", creds, {
            observe: 'response',
            responseType: 'text'
        });
    };
    AuthService.prototype.refreshToken = function () {
        return this.http.post(API_CONFIG.baseUrl + "/auth/refresh_token", {}, {
            observe: 'response',
            responseType: 'text'
        });
    };
    AuthService.prototype.successfulLogin = function (authorizationValue) {
        var tok = authorizationValue.substring(7);
        var user = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrCleanCart();
    };
    AuthService.prototype.logout = function () {
        this.storage.setLocalUser(null);
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            StorageService,
            CartService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map