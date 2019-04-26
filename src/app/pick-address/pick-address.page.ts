import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from '../services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public auth: AuthService,
    public cartService: CartService) {}

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: response['id'],  
            enderecoDeEntrega: null,
            pagamento: null,
            itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }
}
