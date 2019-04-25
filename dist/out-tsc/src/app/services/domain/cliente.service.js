import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';
var ClienteService = /** @class */ (function () {
    function ClienteService(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    ClienteService.prototype.findByEmail = function (email) {
        return this.http.get(API_CONFIG.baseUrl + "/clientes/email/?value=" + email);
    };
    ClienteService.prototype.getImageFromBucket = function (id) {
        var url = API_CONFIG.bucketBaseUrl + "/cp" + id + ".jpg";
        return this.http.get(url, { responseType: 'blob' });
    };
    ClienteService.prototype.insert = function (obj) {
        return this.http.post(API_CONFIG.baseUrl + "/clientes", obj, {
            observe: 'response',
            responseType: 'text'
        });
    };
    ClienteService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, StorageService])
    ], ClienteService);
    return ClienteService;
}());
export { ClienteService };
//# sourceMappingURL=cliente.service.js.map