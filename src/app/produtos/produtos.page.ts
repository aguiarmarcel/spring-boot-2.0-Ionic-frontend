import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavController, LoadingController, IonInfiniteScroll} from '@ionic/angular';
import { ProdutoService } from '../services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items : ProdutoDTO[] = [];
  page: number = 0;

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
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length -1;
      console.log(this.items.length);
      te.dismiss();
      this.loadImageUrls(start, end);
    },
    error => {
      this.loudingCtrl.dismiss();
    });
  }

  loadImageUrls(start : number, end : number){
    for (var i = start; i <= end; i++) {
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
    this.page = 0;
    this.items = [];
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  doInfinite(scroll){
    this.page++;
    this.ngOnInit();
    setTimeout(() => {
      this.infiniteScroll.complete();
      if ( this.items.length == 1000) {
        this.infiniteScroll.disabled = true;
      }
    }, 1000);
  }
}