import * as tslib_1 from "tslib";
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var EstadoService = /** @class */ (function () {
    function EstadoService(http) {
        this.http = http;
    }
    EstadoService.prototype.findAll = function () {
        return this.http.get(API_CONFIG.baseUrl + "/estados");
    };
    EstadoService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EstadoService);
    return EstadoService;
}());
export { EstadoService };
//# sourceMappingURL=estado.service.js.map