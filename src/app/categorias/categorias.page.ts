import { Component } from '@angular/core';
import { CategoriaService } from '../services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(public categoriaService : CategoriaService, public router: Router) { }

  ngOnInit() {
    // callback com função anônima
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
    },
    error => {});
  }

  showProdutos(categoria_id : string) {
    let data = JSON.stringify(categoria_id);
    this.router.navigate(['produtos', data]);
  }
}
