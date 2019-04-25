import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(public produtoService: ProdutoService,
              public cartService: CartService,
              public navControler: NavController) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(response =>{
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error => {});
    }
  }

  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number{
    return this.cartService.total();
  }

  goOn(){
    this.navControler.navigateRoot('/categorias');
  }
}
