import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { CartService } from '../services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  
  constructor(
    public activatedRoute : ActivatedRoute,
    public cartService : CartService,
    public clienteService : ClienteService,
    public storage : StorageService,
    public navctrl : NavController) { 
    
      //Pega o objeto pedido, quem vem da página de pagamento. 
      this.activatedRoute.queryParams
        .subscribe((res) => { 
        this.pedido = JSON.parse(res.value);      
  });
  }

  ngOnInit() {
    
    this.cartItems = this.cartService.getCart().items;
    let localUser = this.storage.getLocalUser();
    if (localUser) {
    this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
       
      },
      error => {
        this.navctrl.navigateForward('/home');
      })
    }
  }
  
  // Como tínhamos perdido a restante das informações do endereço anteriormente, 
  // temos que pegá-las novamente.
  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.total();
  }

}
