import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup.page';
import { CidadeService } from '../services/domain/cidade.service';
import { EstadoService } from '../services/domain/estado.service';
var routes = [
    {
        path: '',
        component: SignupPage
    }
];
var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SignupPage],
            providers: [
                CidadeService,
                EstadoService
            ]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());
export { SignupPageModule };
//# sourceMappingURL=signup.module.js.map