import * as tslib_1 from "tslib";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { API_CONFIG } from 'src/config/api.config';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(storage) {
        this.storage = storage;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var localUser = this.storage.getLocalUser();
        var N = API_CONFIG.baseUrl.length;
        var requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
        if (localUser && requestToAPI) {
            var authRec = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authRec);
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [StorageService])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
export var AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
//# sourceMappingURL=auth-interceptor.js.map