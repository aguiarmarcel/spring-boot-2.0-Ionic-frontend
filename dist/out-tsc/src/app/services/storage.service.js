import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService.prototype.getLocalUser = function () {
        var usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    };
    StorageService.prototype.setLocalUser = function (obj) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    };
    StorageService.prototype.getCart = function () {
        var cart = localStorage.getItem(STORAGE_KEYS.cart);
        if (cart == null) {
            return null;
        }
        else {
            return JSON.parse(cart);
        }
    };
    StorageService.prototype.setCart = function (obj) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    };
    StorageService = tslib_1.__decorate([
        Injectable()
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map