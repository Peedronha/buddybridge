import { AnimalModel } from './../animal/model/animal.model';
import { AnimalService } from './../animal/service/animal.service';
import { Adocao } from './../../dashboard/model/adocao';
import { LayoutService } from './../../layout/service/app.layout.service';
import { animalResolver } from './../animal/guard/animal.resolver';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dash-adocao',
  templateUrl: './dash-adocao.component.html',
  styleUrl: './dash-adocao.component.scss'
})
export class DashAdocaoComponent {
  items!: MenuItem[];
  adocao!: AnimalModel[];

  chartData: any;
  chartOptions: any;

  barData: any;
  barOptions: any;

  pieDataRace: any;
  pieDataAdoption: any;
  pieOptions: any;
  subscription!: Subscription;

   // Quantidade de processos de adoção (inicializado com valores fictícios)
   completedAdoptions = 0;
   inProgressAdoptions = 0;
   pendingAdoptions = 0;
   ineligibleAnimals = 0;


  constructor(public layoutService: LayoutService, public animalService: AnimalService) {
      this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
          this.initChart();
      });
  }

  ngOnInit() {

      this.loadAdoptionStatusChart();
      this.loadRaceChart();

      this.initChart();
      // Carregar animais com adoção pendente
      this.animalService.getPendingAdoptions().subscribe((data: AnimalModel[]) => {
        this.adocao = data;
      });
      // Carregar quantidade de processos de adoção
      this.animalService.getAdoptionStats().subscribe((stats) => {
        this.completedAdoptions = stats.completedAdoptions;
        this.inProgressAdoptions = stats.inProgressAdoptions;
        this.pendingAdoptions = stats.pendingAdoptions;
        this.ineligibleAnimals = stats.noAdoptionProfile;
      });
      //Carrega grafico de linhas
      this.carregarEstatisticasResgateAdocao();

  }

  loadAdoptionStatusChart() {
    this.animalService.getAdoptionStatusChart().subscribe((data) => {
      this.pieDataAdoption = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          },
        ],
      };
    });
  }

  loadRaceChart() {
    this.animalService.getRaceChart().subscribe((data) => {
      this.pieDataRace = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          },
        ],
      };
    });
  }

   // Novo método para carregar receitas e despesas anual para o gráfico
   carregarEstatisticasResgateAdocao() {
    this.animalService.getRescueAndAdoptionStats().subscribe(
      (dados) => {
        // Labels para os meses do ano
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        // Criação de arrays para receitas e despesas
        const resgates = new Array(12).fill(0); // Inicializando com 0 para os 12 meses
        const adocoes = new Array(12).fill(0);

        // Mapeando os dados do backend, assumindo que o backend está retornando o mês no formato numérico (1 para Janeiro, 2 para Fevereiro, etc.)
        dados.forEach((d: any) => {
          const mesIndex = d.mes - 1; // Subtrair 1 para ajustar o índice do array (Janeiro = 0)
          resgates[mesIndex] = d.totalResgatados || 0;
          adocoes[mesIndex] = d.totalAdotados || 0;
        });

        // Configurando os dados para o gráfico de barras
        this.barData = {
          labels: meses,
          datasets: [
            {
              label: 'Resgates',
              backgroundColor: '#42A5F5',
              data: resgates
            },
            {
              label: 'Adoções',
              backgroundColor: '#FFA726',
              data: adocoes
            }
          ]
        };

        // Configurando os dados para o gráfico de linhas
        this.chartData = {
          labels: meses,
          datasets: [
            {
              label: 'Resgates',
              borderColor: '#42A5F5',
              fill: false,
              data: resgates
            },
            {
              label: 'Adoções',
              borderColor: '#FFA726',
              fill: false,
              data: adocoes
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


    this.pieOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
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

}
