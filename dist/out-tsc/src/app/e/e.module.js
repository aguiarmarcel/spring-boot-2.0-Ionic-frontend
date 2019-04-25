import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EPage } from './e.page';
var routes = [
    {
        path: '',
        component: EPage
    }
];
var EPageModule = /** @class */ (function () {
    function EPageModule() {
    }
    EPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EPage]
        })
    ], EPageModule);
    return EPageModule;
}());
export { EPageModule };
//# sourceMappingURL=e.module.js.map