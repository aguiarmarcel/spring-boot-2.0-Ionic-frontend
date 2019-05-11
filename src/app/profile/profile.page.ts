import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente : ClienteDTO;
  picture: any;
  cameraOn: boolean = false;

  constructor(
    public storage: StorageService,
    public clienteService : ClienteService,
    public navCtrl : NavController,
    public auth : AuthService,
    private camera : Camera) {
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
        error => {
          this.auth.logout();
          this.navCtrl.navigateForward('/home');
       });
    }
    else {
      this.auth.logout();
      this.navCtrl.navigateForward('/home');
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe( Response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    }, 
    error => {});
  }

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  getGaleryPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
        .subscribe(response => {
          this.picture = null;
          this.ngOnInit();
        },
        error => {
        });
  }

  cancel(){
    this.picture = null;
  }
}
