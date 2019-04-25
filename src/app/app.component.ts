import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { compileNgModule } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
import { StorageService } from './services/storage.service';
import { AppPage } from 'e2e/src/app.po';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(NavController) nav : NavController;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService) {
    this.initializeApp();
  }
  
  public appPages = [
    
    { title: 'Profile', url: '/profile', component: "ProfilePage"},
    { title: 'Categorias', url: '/categorias', component: "CategoriasPage"},
    { title: 'Carrinho de compras', url: '/cart', component: "CartPage"},
    { title: 'Logout', url: '/home', component: ''}
  ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(appPages : {title: string, component: string}){
    switch (appPages.title) {
      case 'Logout':
      this.authService.logout();
      break;

      default:
      //this.nav.navigateRoot(appPages.component);
    }
  }
}
