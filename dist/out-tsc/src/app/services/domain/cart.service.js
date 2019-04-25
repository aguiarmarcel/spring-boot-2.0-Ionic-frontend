import * as tslib_1 from "tslib";
import { StorageService } from '../storage.service';
import { Injectable } from '@angular/core';
var CartService = /** @class */ (function () {
    function CartService(storage) {
        this.storage = storage;
    }
    CartService.prototype.createOrCleanCart = function () {
        var cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    };
    CartService.prototype.getCart = function () {
        var cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrCleanCart();
        }
        return cart;
    };
    CartService.prototype.addProduto = function (produto) {
        var cart = this.getCart();
        var position = cart.items.findIndex(function (x) { return x.produto.id == produto.id; });
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    };
    CartService.prototype.removeProduto = function (produto) {
        var cart = this.getCart();
        var position = cart.items.findIndex(function (x) { return x.produto.id == produto.id; });
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    };
    CartService.prototype.increaseQuantity = function (produto) {
        var cart = this.getCart();
        var position = cart.items.findIndex(function (x) { return x.produto.id == produto.id; });
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    };
    CartService.prototype.decreaseQuantity = function (produto) {
        var cart = this.getCart();
        var position = cart.items.findIndex(function (x) { return x.produto.id == produto.id; });
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    };
    CartService.prototype.total = function () {
        var cart = this.getCart();
        var sum = 0;
        for (var i = 0; i < cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    };
    CartService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [StorageService])
    ], CartService);
    return CartService;
}());
export { CartService };
//# sourceMappingURL=cart.service.js.map