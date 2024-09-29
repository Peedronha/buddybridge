import { Classificacao } from "../../classificacao/model/classificacao";


export class Movimentacao {
  idMovimentacao?: number;
  historico?: string;
  dataLancamento?: Date;
  classificacao?: Classificacao | null;
  valor: number | null;
  observacoes?: string;
  valorPendente?: number | null;;

  constructor() {
    this.idMovimentacao = undefined;
    this.historico = '';
    this.dataLancamento = new Date();
    this.classificacao = new Classificacao();
    this.valor = 0;
    this.observacoes = '';
    this.valorPendente = 0;
  }
}
