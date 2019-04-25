import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { NavController } from '@ionic/angular';
var CartPage = /** @class */ (function () {
    function CartPage(produtoService, cartService, navControler) {
        this.produtoService = produtoService;
        this.cartService = cartService;
        this.navControler = navControler;
    }
    CartPage.prototype.ngOnInit = function () {
        var cart = this.cartService.getCart();
        this.items = cart.items;
        this.loadImageUrls();
    };
    CartPage.prototype.loadImageUrls = function () {
        var _loop_1 = function () {
            var item = this_1.items[i];
            this_1.produtoService.getSmallImageFromBucket(item.produto.id)
                .subscribe(function (response) {
                item.produto.imageUrl = API_CONFIG.bucketBaseUrl + "/prod" + item.produto.id + "-small.jpg";
            }, function (error) { });
        };
        var this_1 = this;
        for (var i = 0; i < this.items.length; i++) {
            _loop_1();
        }
    };
    CartPage.prototype.removeItem = function (produto) {
        this.items = this.cartService.removeProduto(produto).items;
    };
    CartPage.prototype.increaseQuantity = function (produto) {
        this.items = this.cartService.increaseQuantity(produto).items;
    };
    CartPage.prototype.decreaseQuantity = function (produto) {
        this.items = this.cartService.decreaseQuantity(produto).items;
    };
    CartPage.prototype.total = function () {
        return this.cartService.total();
    };
    CartPage.prototype.goOn = function () {
        this.navControler.navigateRoot('/categorias');
    };
    CartPage = tslib_1.__decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.page.html',
            styleUrls: ['./cart.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ProdutoService,
            CartService,
            NavController])
    ], CartPage);
    return CartPage;
}());
export { CartPage };
//# sourceMappingURL=cart.page.js.map