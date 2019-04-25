import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProdutoDetailPage } from './produto-detail.page';
var routes = [
    {
        path: '',
        component: ProdutoDetailPage
    }
];
var ProdutoDetailPageModule = /** @class */ (function () {
    function ProdutoDetailPageModule() {
    }
    ProdutoDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProdutoDetailPage]
        })
    ], ProdutoDetailPageModule);
    return ProdutoDetailPageModule;
}());
export { ProdutoDetailPageModule };
//# sourceMappingURL=produto-detail.module.js.map