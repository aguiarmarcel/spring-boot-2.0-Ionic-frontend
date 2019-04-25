import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(storage, clienteService, navCtrl, auth) {
        this.storage = storage;
        this.clienteService = clienteService;
        this.navCtrl = navCtrl;
        this.auth = auth;
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        var localUser = this.storage.getLocalUser();
        if (localUser && localUser.email) {
            this.clienteService.findByEmail(localUser.email)
                .subscribe(function (response) {
                _this.cliente = response;
                _this.getImageIfExists();
            }, function (error) {
                _this.auth.logout();
                _this.navCtrl.navigateForward('/home');
            });
        }
        else {
            this.auth.logout();
            this.navCtrl.navigateForward('/home');
        }
    };
    ProfilePage.prototype.getImageIfExists = function () {
        var _this = this;
        this.clienteService.getImageFromBucket(this.cliente.id)
            .subscribe(function (Response) {
            _this.cliente.imageUrl = API_CONFIG.bucketBaseUrl + "/cp" + _this.cliente.id + ".jpg";
        }, function (error) { });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [StorageService,
            ClienteService,
            NavController,
            AuthService])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map