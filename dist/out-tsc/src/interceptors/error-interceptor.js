import * as tslib_1 from "tslib";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NavController, AlertController } from '@ionic/angular';
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(storage, navCtrl, alertCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    ErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(catchError(function (error) {
            var errorObj = error.error;
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);
            switch (errorObj.status) {
                case 401:
                    _this.handle401();
                    break;
                case 403:
                    _this.handle403;
                    break;
                case 422:
                    _this.handle422(errorObj);
                    break;
                default:
                    _this.handleDefaultError(errorObj);
            }
            return Observable.throw(errorObj);
        }));
    };
    ErrorInterceptor.prototype.handleDefaultError = function (errorObj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
                            subHeader: '',
                            message: errorObj.message,
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ErrorInterceptor.prototype.handle401 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Erro 401: falha de autenticação.',
                            subHeader: '',
                            message: 'Email ou senha incorretos.',
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ErrorInterceptor.prototype.handle403 = function () {
        this.storage.setLocalUser(null);
    };
    ErrorInterceptor.prototype.handle422 = function (errorObj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Error 422: Validação',
                            message: this.listErrors(errorObj.errors),
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ErrorInterceptor.prototype.listErrors = function (messages) {
        var s = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    };
    ErrorInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [StorageService,
            NavController,
            AlertController])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
export { ErrorInterceptor };
export var ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
//# sourceMappingURL=error-interceptor.js.map