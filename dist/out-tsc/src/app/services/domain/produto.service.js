import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
var ProdutoService = /** @class */ (function () {
    function ProdutoService(http) {
        this.http = http;
    }
    ProdutoService.prototype.findById = function (produto_id) {
        return this.http.get(API_CONFIG.baseUrl + "/produtos/" + produto_id);
    };
    ProdutoService.prototype.findByCategoria = function (categoria_id) {
        return this.http.get(API_CONFIG.baseUrl + "/produtos/?categorias=" + categoria_id);
    };
    ProdutoService.prototype.getSmallImageFromBucket = function (id) {
        var url = API_CONFIG.bucketBaseUrl + "/prod" + id + "-small.jpg";
        return this.http.get(url, { responseType: 'blob' });
    };
    ProdutoService.prototype.getImageFromBucket = function (id) {
        var url = API_CONFIG.bucketBaseUrl + "/prod" + id + ".jpg";
        return this.http.get(url, { responseType: 'blob' });
    };
    ProdutoService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProdutoService);
    return ProdutoService;
}());
export { ProdutoService };
//# sourceMappingURL=produto.service.js.map