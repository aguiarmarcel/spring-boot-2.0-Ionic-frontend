import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CategoriaService } from '../services/domain/categoria.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(categoriaService, router) {
        this.categoriaService = categoriaService;
        this.router = router;
        this.bucketUrl = API_CONFIG.bucketBaseUrl;
    }
    CategoriasPage.prototype.ngOnInit = function () {
        var _this = this;
        // callback com função anônima
        this.categoriaService.findAll()
            .subscribe(function (response) {
            _this.items = response;
        }, function (error) { });
    };
    CategoriasPage.prototype.showProdutos = function (categoria_id) {
        var data = JSON.stringify(categoria_id);
        this.router.navigate(['produtos', data]);
    };
    CategoriasPage = tslib_1.__decorate([
        Component({
            selector: 'app-categorias',
            templateUrl: './categorias.page.html',
            styleUrls: ['./categorias.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [CategoriaService,
            Router])
    ], CategoriasPage);
    return CategoriasPage;
}());
export { CategoriasPage };
//# sourceMappingURL=categorias.page.js.map