
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Movimentacao } from '../movimento/model/movimentacao';
import { MovimentacaoService } from '../movimento/service/movimento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashfinanceiro.component.html',
  styleUrl: './dashfinanceiro.component.scss'
})
export class DashfinanceiroComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  // Variáveis para armazenar os valores dos cards
  totalFaturamentoMensal!: number;
  faturamentoAtual!: number;
  totalDespesasMensal!: number;
  totalDespesas!: number;

  movimentacoesPendentes: any[] = [];
  movimentacoes!: Movimentacao[];

  chartData: any;
  chartOptions: any;

  barData: any;
  barOptions: any;

  pieDataReceitas: any;
  pieDataDespesas: any;
  pieOptions: any;

  subscription!: Subscription;

  constructor(public layoutService: LayoutService, private movimentacaoService: MovimentacaoService) {
      this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
          this.initChart();
      });
  }

  ngOnInit() {
      this.initChart();
      this.carregarRelatorioMensalFinanceiro();
      this.carregarReceitasDespesasAnual(); // Chama o método para carregar os dados do gráfico
      this.carregarReceitasDespesasPorConta('mes'); // Inicializa com o filtro "mes" (mês atual)
      this.movimentacaoService.getMovimentacoesPendentes().subscribe(
        (resumo) => {
          this.movimentacoesPendentes = resumo;
        },
        (error) => {
          console.error('Erro ao carregar resumo de movimentações pendentes', error);
        }
      );
  }

  carregarReceitasDespesasPorConta(filtro: string) {
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth() + 1;

    // Carregar receitas por conta de caixa
    this.movimentacaoService.getReceitasPorContaCaixa(anoAtual, mesAtual, filtro).subscribe((dadosReceitas) => {
      const contasReceitas = dadosReceitas.map((d: any) => d.conta);
      const totalReceitas = dadosReceitas.map((d: any) => d.totalReceitas);

      this.pieDataReceitas = {
        labels: contasReceitas,
        datasets: [
          {
            data: totalReceitas,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
            hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
          }
        ]
      };
    });

    // Carregar despesas por conta de caixa
    this.movimentacaoService.getDespesasPorContaCaixa(anoAtual, mesAtual, filtro).subscribe((dadosDespesas) => {
      const contasDespesas = dadosDespesas.map((d: any) => d.conta);
      const totalDespesas = dadosDespesas.map((d: any) => d.totalDespesas);

      this.pieDataDespesas = {
        labels: contasDespesas,
        datasets: [
          {
            data: totalDespesas,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
            hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
          }
        ]
      };
    });
  }

  // Métodos para mudar o filtro e recarregar os gráficos
  carregarMesAtual() {
    this.carregarReceitasDespesasPorConta('mes');
  }

  carregarAnoAtual() {
    this.carregarReceitasDespesasPorConta('ano');
  }

  carregarTodoPeriodo() {
    this.carregarReceitasDespesasPorConta('todos');
  }

   // Método para carregar o relatório financeiro e popular os valores
   carregarRelatorioMensalFinanceiro() {
    this.movimentacaoService.getValoresRelatorioMensal().subscribe(
      (relatorio) => {
        this.totalFaturamentoMensal = relatorio.totalReceitasProgramadas || 0;
        this.faturamentoAtual = relatorio.totalReceitasRecebidas || 0;
        this.totalDespesasMensal = relatorio.totalDespesasProgramadas || 0;
        this.totalDespesas = relatorio.totalDespesasPagas || 0;
      },
      (error) => {
        console.error('Erro ao carregar o relatório financeiro', error);
      }
    );
  }

  // Novo método para carregar receitas e despesas anual para o gráfico
  carregarReceitasDespesasAnual() {
    this.movimentacaoService.getReceitasDespesasAnual().subscribe(
      (dados) => {
        // Labels para os meses do ano
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        // Criação de arrays para receitas e despesas
        const receitas = new Array(12).fill(0); // Inicializando com 0 para os 12 meses
        const despesas = new Array(12).fill(0);

        // Mapeando os dados do backend, assumindo que o backend está retornando o mês no formato numérico (1 para Janeiro, 2 para Fevereiro, etc.)
        dados.forEach((d: any) => {
          const mesIndex = d.mes - 1; // Subtrair 1 para ajustar o índice do array (Janeiro = 0)
          receitas[mesIndex] = d.totalReceitas || 0;
          despesas[mesIndex] = d.totalDespesas || 0;
        });

        // Configurando os dados para o gráfico de barras
        this.barData = {
          labels: meses,
          datasets: [
            {
              label: 'Receitas',
              backgroundColor: '#42A5F5',
              data: receitas
            },
            {
              label: 'Despesas',
              backgroundColor: '#FFA726',
              data: despesas
            }
          ]
        };

        // Configurando os dados para o gráfico de linhas
        this.chartData = {
          labels: meses,
          datasets: [
            {
              label: 'Receitas',
              borderColor: '#42A5F5',
              fill: false,
              data: receitas
            },
            {
              label: 'Despesas',
              borderColor: '#FFA726',
              fill: false,
              data: despesas
            }
          ]
        };
      },
      (error) => {
        console.error('Erro ao carregar dados de receitas e despesas', error);
      }
    );
  }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.barOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Receitas X Despesas - Anual'
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColor
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColor
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Receitas X Despesas - Anual'
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColor
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColor
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  incluirRecibo(idMovimentacao: number) {
    // Aqui você pode implementar a lógica para incluir um recibo
    console.log('Incluir recibo para movimentação com ID:', idMovimentacao);
    // Implemente a lógica de inclusão de recibo aqui
  }
}
