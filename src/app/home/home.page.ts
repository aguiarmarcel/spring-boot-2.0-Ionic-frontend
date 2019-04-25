import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }
  constructor(
    public navCrl: NavController, 
    public menu: MenuController,
    public auth: AuthService){

  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCrl.navigateRoot('/categorias');
    }, 
    _error => {});

  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCrl.navigateRoot('/categorias');
    }, 
    _error => {});
  }

  signup(){
    this.navCrl.navigateForward('/signup');
  }

}
