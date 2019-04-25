import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
var CategoriaService = /** @class */ (function () {
    function CategoriaService(http) {
        this.http = http;
    }
    CategoriaService.prototype.findAll = function () {
        return this.http.get(API_CONFIG.baseUrl + "/categorias");
    };
    CategoriaService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CategoriaService);
    return CategoriaService;
}());
export { CategoriaService };
//# sourceMappingURL=categoria.service.js.map