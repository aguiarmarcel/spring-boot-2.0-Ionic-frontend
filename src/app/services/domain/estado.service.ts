
import { EstadoDTO } from "../../../models/estado.dto";
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EstadoService{

    constructor(public http: HttpClient){}

    findAll() : Observable<EstadoDTO[]>{
 
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}