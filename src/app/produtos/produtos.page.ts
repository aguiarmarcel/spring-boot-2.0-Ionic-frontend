import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavController, NavParams } from '@ionic/angular';
import { ProdutoService } from '../services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];

  constructor(public activateRoute: ActivatedRoute, public produtoService: ProdutoService) { }

  ngOnInit() {
    let categoria_id = this.activateRoute.snapshot.paramMap.get('data');
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
    },
    error => {});
  }
}
