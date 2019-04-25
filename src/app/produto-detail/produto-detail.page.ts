import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from '../services/domain/cart.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(public activateRoute: ActivatedRoute,
              public navctrl: NavController, 
              public produtoService: ProdutoService,
              public cartService: CartService) { }

  ngOnInit() {
    let produto_id = this.activateRoute.snapshot.paramMap.get('prodData');
    this.produtoService.findById(produto_id)
    .subscribe(response => {
      this.item = response;
      this.getImageUrlIfExist();
    },
    error => {});
  }

  getImageUrlIfExist(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response =>{
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto : ProdutoDTO){
    this.cartService.addProduto(produto);
    this.navctrl.navigateRoot('/cart');
  }
}
