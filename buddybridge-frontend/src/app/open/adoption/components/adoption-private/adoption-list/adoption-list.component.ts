import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdoptionService} from "../../../../../restrict/base/adoption-profile/shared/adoption.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalService} from "../../../../../restrict/base/animal/service/animal.service";
import {AdoptionFormModel} from "../../../models/AdoptionFormModel";

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss'
})
export class AdoptionListComponent {
  @Input() adoptions!: AdoptionFormModel[];

  _specificEntity: any = {};

  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';

  formVisible: boolean = false;

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];

  statusOptions = [
    { label: 'Pendente', value: 'PENDING' },
    { label: 'Em analise', value: 'ANALYSING' },
    { label: 'Aprovada', value: 'APPROVED' },
    { label: 'Rejeitada', value: 'REJECTED' },
    { label: 'Finalizada', value: 'COMPLETED' }
  ];

  getStatusLabel(statusValue: string): string {
    const status = this.statusOptions.find(option => option.value === statusValue);
    return status ? status.label : statusValue;
  }


  constructor(private animalService: AnimalService,
              private adoptionService: AdoptionService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.adoptionService.getAdoptions().subscribe((data: AdoptionFormModel[]) => {
      console.log("cade?" + data)
      this.adoptions = data;
    });
  }


  onEdit(idAdocao: number) {
    this.edit.emit(idAdocao);
  }
}
