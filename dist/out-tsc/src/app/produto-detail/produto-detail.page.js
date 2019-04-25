import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from '../services/domain/cart.service';
import { NavController } from '@ionic/angular';
var ProdutoDetailPage = /** @class */ (function () {
    function ProdutoDetailPage(activateRoute, navctrl, produtoService, cartService) {
        this.activateRoute = activateRoute;
        this.navctrl = navctrl;
        this.produtoService = produtoService;
        this.cartService = cartService;
    }
    ProdutoDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        var produto_id = this.activateRoute.snapshot.paramMap.get('prodData');
        this.produtoService.findById(produto_id)
            .subscribe(function (response) {
            _this.item = response;
            _this.getImageUrlIfExist();
        }, function (error) { });
    };
    ProdutoDetailPage.prototype.getImageUrlIfExist = function () {
        var _this = this;
        this.produtoService.getImageFromBucket(this.item.id)
            .subscribe(function (response) {
            _this.item.imageUrl = API_CONFIG.bucketBaseUrl + "/prod" + _this.item.id + ".jpg";
        }, function (error) { });
    };
    ProdutoDetailPage.prototype.addToCart = function (produto) {
        this.cartService.addProduto(produto);
        this.navctrl.navigateRoot('/cart');
    };
    ProdutoDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-produto-detail',
            templateUrl: './produto-detail.page.html',
            styleUrls: ['./produto-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            NavController,
            ProdutoService,
            CartService])
    ], ProdutoDetailPage);
    return ProdutoDetailPage;
}());
export { ProdutoDetailPage };
//# sourceMappingURL=produto-detail.page.js.map