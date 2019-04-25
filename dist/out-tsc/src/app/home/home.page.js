import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
var HomePage = /** @class */ (function () {
    function HomePage(navCrl, menu, auth) {
        this.navCrl = navCrl;
        this.menu = menu;
        this.auth = auth;
        this.creds = {
            email: "",
            senha: ""
        };
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
        this.menu.swipeEnable(false);
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.menu.enable(true);
        this.menu.swipeEnable(true);
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.auth.refreshToken()
            .subscribe(function (response) {
            _this.auth.successfulLogin(response.headers.get('Authorization'));
            _this.navCrl.navigateRoot('/categorias');
        }, function (_error) { });
    };
    HomePage.prototype.login = function () {
        var _this = this;
        this.auth.authenticate(this.creds)
            .subscribe(function (response) {
            _this.auth.successfulLogin(response.headers.get('Authorization'));
            _this.navCrl.navigateRoot('/categorias');
        }, function (_error) { });
    };
    HomePage.prototype.signup = function () {
        this.navCrl.navigateForward('/signup');
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            MenuController,
            AuthService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map