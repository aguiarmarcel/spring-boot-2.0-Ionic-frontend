import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'produtos/:data', loadChildren: './produtos/produtos.module#ProdutosPageModule' },
    { path: 'produto-detail/:prodData', loadChildren: './produto-detail/produto-detail.module#ProdutoDetailPageModule' },
    { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
    { path: 'e', loadChildren: './e/e.module#EPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map