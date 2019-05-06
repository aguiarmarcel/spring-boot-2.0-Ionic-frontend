import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavController, LoadingController} from '@ionic/angular';
import { ProdutoService } from '../services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { LoadedRouterConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];

  constructor(
    public activateRoute: ActivatedRoute, 
    public produtoService: ProdutoService,
    public navCrtl: NavController,
    public router: Router,
    public loudingCtrl : LoadingController) { }

  async ngOnInit() {
    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');
    const te = await this.loudingCtrl.create({
      message: "Aguarde..."
    });
    await te.present();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
      te.dismiss();
      this.loadImageUrls();
    },
    error => {
      this.loudingCtrl.dismiss();
    });
  }

  loadImageUrls(){
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response =>{
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    }
  }

  showDetail(produto_id : string){
    let prodData = JSON.stringify(produto_id);
    this.router.navigate(['produto-detail', prodData]);
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}