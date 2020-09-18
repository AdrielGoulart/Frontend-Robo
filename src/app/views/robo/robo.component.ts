import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RoboService } from '../robo/robo.service';
import { Robo } from 'src/app/models/robo';
import { Cotovelo } from '../../enum/cotovelo'
import { Pulso } from 'src/app/enum/pulso';
import { Inclinacao } from 'src/app/enum/inclinacao';
import { Rotacao } from 'src/app/enum/rotacao';

@Component({
  selector: 'app-robo',
  templateUrl: './robo.component.html',
  styleUrls: ['./robo.component.scss']
})
export class RoboComponent implements OnInit {

  //Valores para preenchimento dos campos de select
  listaEstadosPulso: string[] = ["Rotação para -90º", "Rotação para -45º", "Em Repouso",
    "Rotação para 45º", "Rotação para 90º", "Rotação para 135º", "Rotação para 180º"];
  listaEstadosCotovelo: string[] = ["Em repouso", "Levemente Contraído", "Contraído", "Fortemente Contraído"];
  listaEstadosRotacao: string[] = ["Rotação -90º", "Rotação -45º", "Em Repouso", "Rotação 45º", "Rotação 90º"];
  listaEstadosInclinacao: string[] = ["Para cima", "Em Repouso", "Para Baixo"];

  //Variáveis para o aparecimento das mensagens
  mensagemBack: string;
  mensagemErroBack: string;
  sucesso: boolean;
  erro: boolean;

  //Variáveis para armazenar os estados atuais das partes do robo
  robo: Robo;
  cotoveloEsq: string;
  cotoveloDir: string;
  pulsoEsq: string;
  pulsoDir: string;
  inclinacaoCabeca: string;
  rotacaoCabeca: string;



  constructor(private roboService: RoboService) { }

  ngOnInit() {
    this.getRoboInicial();
  }


  getRoboInicial(){
    this.roboService.getRoboInicial().pipe(first()).subscribe(
      data => {
        this.cotoveloEsq = Cotovelo[data.Data.BracoEsquerdo.idCotovelo];
        this.cotoveloDir = Cotovelo[data.Data.BracoDireito.idCotovelo];
        this.pulsoEsq = Pulso[data.Data.BracoEsquerdo.idPulso];
        this.pulsoDir = Pulso[data.Data.BracoDireito.idPulso];
        this.inclinacaoCabeca = Inclinacao[data.Data.Cabeca.idInclinacao];
        this.rotacaoCabeca = Rotacao[data.Data.Cabeca.idRotacao];
        this.mensagemBack = data.Mensagem;
      },
      error => {
        console.log(error);
      });
  }

  mudaInclinacaoCabeca(event: any) {
    var valor = Number(event.target.value) + 1;
    this.roboService.mudaInclinacaoCabeca(valor)
    .pipe(first()).subscribe(
      data => {
        this.inclinacaoCabeca = Inclinacao[data.Data.idInclinacao];
        this.mensagemBack = data.Mensagem;
        this.mensagemErroBack = '';
        this.sucesso = data.Sucesso;
        this.erro = false;
      },
      error => {
        this.mensagemErroBack = error.toString().replace("Error:", "");
        this.erro = true;
        this.sucesso = false;
      });

  }

  mudaRotacaoCabeca(event: any) {
    var valor = Number(event.target.value) + 1;
    this.roboService.mudaRotacaoCabeca(valor)
    .pipe(first()).subscribe(
      data => {
        this.rotacaoCabeca = Rotacao[data.Data.idRotacao];
        this.mensagemBack = data.Mensagem;
        this.sucesso = data.Sucesso;
        this.erro = false;
      },
      error => {
        this.mensagemErroBack = error.toString().replace("Error:", "");
        this.erro = true;
        this.sucesso = false;
      });

  }

  mudaEstadoPulso(event: any, ladoBraco: string){
    var valor = Number(event.target.value) + 1;
    this.roboService.mudaEstadoPulso(valor, ladoBraco)
    .pipe(first()).subscribe(
      data => {
        if(ladoBraco == "direito"){
          this.pulsoDir = Pulso[data.Data.idPulso];
        }else{
          this.pulsoEsq = Pulso[data.Data.idPulso];
        }
        this.mensagemBack = data.Mensagem;
        this.sucesso = data.Sucesso;
        this.erro = false;
      },
      error => {
        this.mensagemErroBack = error.toString().replace("Error:", "");
        this.erro = true;
        this.sucesso = false;
      });
  }

  mudaEstadoCotovelo(event: any, ladoBraco: string){
    var valor = Number(event.target.value) + 1;
    this.roboService.mudaEstadoCotovelo(valor, ladoBraco)
    .pipe(first()).subscribe(
      data => {
        if(ladoBraco == "direito"){
          this.cotoveloDir = Cotovelo[data.Data.idCotovelo];
        }else{
          this.cotoveloEsq = Cotovelo[data.Data.idCotovelo];
        }
        this.mensagemBack = data.Mensagem;
        this.sucesso = data.Sucesso;
        this.erro = false;
      },
      error => {
        this.mensagemErroBack = error.toString().replace("Error:", "");
        this.erro = true;
        this.sucesso = false;
      });
  }


}
