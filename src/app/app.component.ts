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
    private statusBar: StatusBar) {
    this.initializeApp();
  }
  
  public appPages = [
    
    { title: 'Profile', url: '/profile', component: "ProfilePage"},
    { title: 'Categorias', url: '/categorias', component: "CategoriasPage"},
    { title: 'Logout', component: ''}
  ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
