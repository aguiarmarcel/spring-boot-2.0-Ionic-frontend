import { Component } from '@angular/core';
import { CategoriaService } from '../services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage {

  constructor(public categoriaService : CategoriaService) { }

  ngOnInit() {
    console.log('ionViewDidLoad CategoriasPage');
    // callback com função anônima
    this.categoriaService.findAll().subscribe(response => {
        console.log(response);
    },
    error => {
        console.log(error);
    });
  }
}
