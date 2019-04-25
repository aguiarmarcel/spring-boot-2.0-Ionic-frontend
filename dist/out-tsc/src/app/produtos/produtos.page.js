import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProdutoService } from '../services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
var ProdutosPage = /** @class */ (function () {
    function ProdutosPage(activateRoute, produtoService, navCrtl, router) {
        this.activateRoute = activateRoute;
        this.produtoService = produtoService;
        this.navCrtl = navCrtl;
        this.router = router;
    }
    ProdutosPage.prototype.ngOnInit = function () {
        var _this = this;
        var categoria_id = this.activateRoute.snapshot.paramMap.get('data');
        this.produtoService.findByCategoria(categoria_id)
            .subscribe(function (response) {
            _this.items = response['content'];
            _this.loadImageUrls();
        }, function (error) { });
    };
    ProdutosPage.prototype.loadImageUrls = function () {
        var _loop_1 = function () {
            var item = this_1.items[i];
            this_1.produtoService.getSmallImageFromBucket(item.id)
                .subscribe(function (response) {
                item.imageUrl = API_CONFIG.bucketBaseUrl + "/prod" + item.id + "-small.jpg";
            }, function (error) { });
        };
        var this_1 = this;
        for (var i = 0; i < this.items.length; i++) {
            _loop_1();
        }
    };
    ProdutosPage.prototype.showDetail = function (produto_id) {
        var prodData = JSON.stringify(produto_id);
        this.router.navigate(['produto-detail', prodData]);
    };
    ProdutosPage = tslib_1.__decorate([
        Component({
            selector: 'app-produtos',
            templateUrl: './produtos.page.html',
            styleUrls: ['./produtos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            ProdutoService,
            NavController,
            Router])
    ], ProdutosPage);
    return ProdutosPage;
}());
export { ProdutosPage };
//# sourceMappingURL=produtos.page.js.map