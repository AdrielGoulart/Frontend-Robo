import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { RoboResponse } from './../../models/roboresponse'

@Injectable({
  providedIn: 'root'
})
export class RoboService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getRoboInicial() {
    return this.http.get<RoboResponse>(`${environment.apiUrl}/robo-inicializacao`).pipe(delay(500));
  }

  mudaEstadoCotovelo(idCotovelo: number, ladoBraco: string) {
    return this.http.put<RoboResponse>(`${environment.apiUrl}/braco-estado-cotovelo/${idCotovelo}/${ladoBraco}`, this.httpOptions)
      .pipe(
        map(response => {
          if (response.Sucesso) {
            return response;
          } else {
            throw new Error(response.Mensagem);
          }
        }
        )
      )
  }

  mudaEstadoPulso(idPulso: number, ladoBraco: string) {
    return this.http.put<RoboResponse>(`${environment.apiUrl}/braco-estado-pulso/${idPulso}/${ladoBraco}`, this.httpOptions)
      .pipe(
        map(response => {
          if (response.Sucesso) {
            return response;
          } else {
            throw new Error(response.Mensagem);
          }
        }
        )
      )
  }

  mudaRotacaoCabeca(idRotacao: number) {
    return this.http.put<RoboResponse>(`${environment.apiUrl}/cabeca-estado-rotacao/${idRotacao}`, this.httpOptions)
      .pipe(
        map(response => {
          if (response.Sucesso) {
            return response;
          } else {
            throw new Error(response.Mensagem);
          }
        }
        )
      )
  }

  mudaInclinacaoCabeca(idInclinacao: number) {
    return this.http.put<RoboResponse>(`${environment.apiUrl}/cabeca-estado-inclinacao/${idInclinacao}`, this.httpOptions)
      .pipe(
        map(response => {
          if (response.Sucesso) {
            return response;
          } else {
            throw new Error(response.Mensagem);
          }
        }
        )
      )
  }




}
