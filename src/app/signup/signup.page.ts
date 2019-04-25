import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CidadeService } from '../services/domain/cidade.service';
import { EstadoService } from '../services/domain/estado.service';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteService } from '../services/domain/cliente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  
  constructor(
    public menu: MenuController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
      
      this.formGroup = this.formBuilder.group({
        nome: ['Brenda', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['10brendalouise@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['03385220424', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Brancas Dunas', [Validators.required]],     
        numero : ['2016',[Validators.required]],
        complemento : ['ap 203',[]],
        bairro : ['Candelária',[]],
        cep : ['59014-020',[Validators.required]],
        telefone1 : ['84994046424', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]
      });
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }  

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ngOnInit() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }
  
  updateCidades(){
    let estado_id = this.formGroup.controls.estadoId.value;
    this.cidadeService.findAll(estado_id).subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value)
    .subscribe(Response =>{
      this.showInsertOk();
    },
    error => {});
  }

  async showInsertOk(){
    let alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    await alert.present();
  }

}
