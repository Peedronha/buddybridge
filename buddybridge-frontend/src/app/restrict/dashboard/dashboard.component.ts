import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../layout/service/app.layout.service';
import { Adocao } from './model/adocao';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  adocao!: Adocao[];

  chartData: any;

  chartOptions: any;

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  subscription!: Subscription;

  constructor(public layoutService: LayoutService) {
      this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
          this.initChart();
      });
  }

  ngOnInit() {
      this.initChart();
      //this.productService.getProductsSmall().then(data => this.products = data);
    this.adocao = [
      { cod: '001', nome: 'Bella', raca: 'Labrador', localizacao: '1A', status: 'Aguardando retirada' },
      { cod: '002', nome: 'Max', raca: 'Bulldog', localizacao: '2B', status: 'Aguardando microchipagem' },
      { cod: '003', nome: 'Luna', raca: 'Poodle', localizacao: '3C', status: 'Aguardando documentação' },
      { cod: '004', nome: 'Charlie', raca: 'Beagle', localizacao: '4D', status: 'Aguardando retirada' },
      { cod: '005', nome: 'Lucy', raca: 'Boxer', localizacao: '5E', status: 'Aguardando microchipagem' },
      { cod: '006', nome: 'Cooper', raca: 'Chihuahua', localizacao: '6F', status: 'Aguardando documentação' },
      { cod: '007', nome: 'Daisy', raca: 'Pomeranian', localizacao: '7G', status: 'Aguardando retirada' },
      { cod: '008', nome: 'Bailey', raca: 'Rottweiler', localizacao: '8H', status: 'Aguardando microchipagem' },
      { cod: '009', nome: 'Sadie', raca: 'Dachshund', localizacao: '9I', status: 'Aguardando documentação' },
      { cod: '010', nome: 'Molly', raca: 'Shih Tzu', localizacao: '10J', status: 'Aguardando retirada' },
      { cod: '011', nome: 'Maggie', raca: 'Cocker Spaniel', localizacao: '11K', status: 'Aguardando microchipagem' },
      { cod: '012', nome: 'Buddy', raca: 'Schnauzer', localizacao: '12L', status: 'Aguardando documentação' },
      { cod: '013', nome: 'Rocky', raca: 'Golden Retriever', localizacao: '13M', status: 'Aguardando retirada' },
      { cod: '014', nome: 'Zoey', raca: 'Great Dane', localizacao: '14N', status: 'Aguardando microchipagem' },
      { cod: '015', nome: 'Jack', raca: 'Siberian Husky', localizacao: '15O', status: 'Aguardando documentação' },
      { cod: '016', nome: 'Oliver', raca: 'Doberman', localizacao: '16P', status: 'Aguardando retirada' },
      { cod: '017', nome: 'Chloe', raca: 'Mastiff', localizacao: '17Q', status: 'Aguardando microchipagem' },
      { cod: '018', nome: 'Duke', raca: 'Border Collie', localizacao: '18R', status: 'Aguardando documentação' },
      { cod: '019', nome: 'Zoe', raca: 'Pug', localizacao: '19S', status: 'Aguardando retirada' },
      { cod: '020', nome: 'Buster', raca: 'Saint Bernard', localizacao: '20T', status: 'Aguardando microchipagem' }

    ]

      this.items = [
          { label: 'Add New', icon: 'pi pi-fw pi-plus' },
          { label: 'Remove', icon: 'pi pi-fw pi-minus' }
      ];
  }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.chartData = {
          labels: ['Dezembro','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',],
          datasets: [
              {
                  label: 'Animais resgatados',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                  borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                  tension: .4
              },
              {
                  label: 'Animais doados',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--green-600'),
                  borderColor: documentStyle.getPropertyValue('--green-600'),
                  tension: .4
              }
          ]
      };

      this.chartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };

      this.barData = {
        labels: ['Dezembro','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',],
        datasets: [
            {
                label: 'Animais',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    this.barOptions = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
        }
    };

    this.pieData = {
      labels: ['Adoções concluídas', 'Aguardando Adoção', 'Adoções em andamento', 'Animais inaptos para doação'],
      datasets: [
          {
              data: [2593, 658, 125, 40],
              backgroundColor: [
                  documentStyle.getPropertyValue('--indigo-500'),
                  documentStyle.getPropertyValue('--purple-500'),
                  documentStyle.getPropertyValue('--teal-500'),
                  documentStyle.getPropertyValue('--red-500')
              ],
              hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--indigo-400'),
                  documentStyle.getPropertyValue('--purple-400'),
                  documentStyle.getPropertyValue('--teal-400'),
                  documentStyle.getPropertyValue('--red-400'),
              ]
          }]
  };

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
