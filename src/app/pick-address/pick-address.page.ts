import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {
    this.items =[
      {
        id: '1',
        logradouro: "Rua Desembargador Dionisio FIlgueira",
        numero: '744',
        complemento: 'ap 201',
        bairro: 'Petrópolis',
        cep: '59014-020',
        cidade: {
          id: '1',
          nome: 'Natal',
          estado: {
            id: '1',
            nome: 'Rio Grande do Norte'
          }
        }
      },
      {
        id: '2',
        logradouro: "Rua Professora Maria Sales",
        numero: '222',
        complemento: 'ap 201',
        bairro: 'Tambaú',
        cep: '58014-020',
        cidade: {
          id: '2',
          nome: 'João Pessoa',
          estado: {
            id: '2',
            nome: 'Paraíba'
          }
        }
      }
    ]
  }

}
