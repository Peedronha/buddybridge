import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { AnimalService } from '../base/animal/service/animal.service';
import { AdoptionService } from '../base/adoption-profile/shared/adoption.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adocoesEmAndamento: any[] = [];
  completedAdoptions = 0;
  inProgressAdoptions = 0;
  pendingAdoptions = 0;
  ineligibleAnimals = 0;

  constructor(
    private layoutService: LayoutService,
    private animalService: AnimalService,
    private adoptionService: AdoptionService
  ) {}

  ngOnInit() {
    this.animalService.getAdoptionStats().subscribe((stats) => {
      this.completedAdoptions = stats.completedAdoptions;
      this.inProgressAdoptions = stats.inProgressAdoptions;
      this.pendingAdoptions = stats.pendingAdoptions;
      this.ineligibleAnimals = stats.noAdoptionProfile;
    });

    const usuarioId = parseInt(localStorage.getItem('idUser') || '0');
    this.adoptionService.findProfilesByUsuarioAdocaoId(usuarioId).subscribe((data) => {
      // Armazena os IDs de adoção e busca os detalhes para cada adoção
      data.forEach(adocao => {
        this.adoptionService.getAdoptionsById(adocao.id_adocao).subscribe(details => {
          this.adocoesEmAndamento.push({
            ...adocao,
            nome_adotante: details.nome_adotante,
            nome_animal: details.nome_animal,
            status_adocao: details.status_adocao
          });
        });
      });
    });
  }
}
