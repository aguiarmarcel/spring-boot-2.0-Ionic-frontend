import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(public navCrl: NavController, public menu: MenuController){

  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
    
  ionViewDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

  login(){
     this.navCrl.navigateRoot('/categorias');
  }
}
