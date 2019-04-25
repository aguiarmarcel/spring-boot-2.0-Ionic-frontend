import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../services/domain/cidade.service';
import { EstadoService } from '../services/domain/estado.service';
import { ClienteService } from '../services/domain/cliente.service';
var SignupPage = /** @class */ (function () {
    function SignupPage(menu, navCtrl, formBuilder, cidadeService, estadoService, clienteService, alertCtrl) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.cidadeService = cidadeService;
        this.estadoService = estadoService;
        this.clienteService = clienteService;
        this.alertCtrl = alertCtrl;
        this.formGroup = this.formBuilder.group({
            nome: ['Brenda', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
            email: ['10brendalouise@gmail.com', [Validators.required, Validators.email]],
            tipo: ['1', [Validators.required]],
            cpfOuCnpj: ['03385220424', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
            senha: ['123', [Validators.required]],
            logradouro: ['Rua Brancas Dunas', [Validators.required]],
            numero: ['2016', [Validators.required]],
            complemento: ['ap 203', []],
            bairro: ['Candelária', []],
            cep: ['59014-020', [Validators.required]],
            telefone1: ['84994046424', [Validators.required]],
            telefone2: ['', []],
            telefone3: ['', []],
            estadoId: [null, [Validators.required]],
            cidadeId: [null, [Validators.required]]
        });
    }
    SignupPage.prototype.ionViewWillEnter = function () {
        this.menu.swipeEnable(false);
    };
    SignupPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    SignupPage.prototype.ngOnInit = function () {
        var _this = this;
        this.estadoService.findAll().subscribe(function (response) {
            _this.estados = response;
            _this.formGroup.controls.estadoId.setValue(_this.estados[0].id);
            _this.updateCidades();
        }, function (error) { });
    };
    SignupPage.prototype.updateCidades = function () {
        var _this = this;
        var estado_id = this.formGroup.controls.estadoId.value;
        this.cidadeService.findAll(estado_id).subscribe(function (response) {
            _this.cidades = response;
            _this.formGroup.controls.cidadeId.setValue(null);
        }, function (error) { });
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        this.clienteService.insert(this.formGroup.value)
            .subscribe(function (Response) {
            _this.showInsertOk();
        }, function (error) { });
    };
    SignupPage.prototype.showInsertOk = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Sucesso!',
                            message: 'Cadastro efetuado com sucesso',
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.navCtrl.pop();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController,
            NavController,
            FormBuilder,
            CidadeService,
            EstadoService,
            ClienteService,
            AlertController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map