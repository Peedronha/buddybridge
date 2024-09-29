import { ContaCaixa } from "../../contacaixa/model/contacaixa";
import { Movimentacao } from "../../movimento/model/movimentacao";

export class Pagamento {
  idPagamento?: number;
  movimentacao?: Movimentacao | null;
  contaCaixa?: ContaCaixa | null;
  dataRecebimento?: Date;
  valorPagamento?: number;

  constructor() {
    this.idPagamento = undefined;
    this.movimentacao = new Movimentacao();
    this.contaCaixa = new ContaCaixa();
    this.dataRecebimento = new Date();
    this.valorPagamento = 0;
  }
}
