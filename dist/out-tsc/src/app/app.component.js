import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, authService) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authService = authService;
        this.appPages = [
            { title: 'Profile', url: '/profile', component: "ProfilePage" },
            { title: 'Categorias', url: '/categorias', component: "CategoriasPage" },
            { title: 'Carrinho de compras', url: '/cart', component: "CartPage" },
            { title: 'Logout', url: '/home', component: '' }
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.openPage = function (appPages) {
        switch (appPages.title) {
            case 'Logout':
                this.authService.logout();
                break;
            default:
            //this.nav.navigateRoot(appPages.component);
        }
    };
    tslib_1.__decorate([
        ViewChild(NavController),
        tslib_1.__metadata("design:type", NavController)
    ], AppComponent.prototype, "nav", void 0);
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map