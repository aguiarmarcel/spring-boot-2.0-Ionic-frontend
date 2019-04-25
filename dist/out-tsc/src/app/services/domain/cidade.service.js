import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
var CidadeService = /** @class */ (function () {
    function CidadeService(http) {
        this.http = http;
    }
    CidadeService.prototype.findAll = function (estado_id) {
        return this.http.get(API_CONFIG.baseUrl + "/estados/" + estado_id + "/cidades");
    };
    CidadeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CidadeService);
    return CidadeService;
}());
export { CidadeService };
//# sourceMappingURL=cidade.service.js.map