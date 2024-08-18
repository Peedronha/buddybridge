import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AnimalModel} from "../../../animal/model/animal.model";
import {AnimalService} from "../../../animal/service/animal.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {DataViewModule} from "primeng/dataview";
import {TagModule} from "primeng/tag";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-adoption-grid',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    NgForOf,
    ButtonModule,
    DropdownModule,
    DataViewModule,
    TagModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './adoption-grid.component.html',
  styleUrl: './adoption-grid.component.scss'
})
export class AdoptionGridComponent {
  @Input() animals?: AnimalModel[]
  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  constructor(
    private animalService: AnimalService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
  }

  refresh() {
    this.animalService.getAnimals().subscribe((data: AnimalModel[]) => {
      this.animals! = data;
    });

  }

  onAdd(idAnimal: number) {
    this.add.emit(idAnimal);
  }

  onEdit(idAnimal: number) {
    this.edit.emit(idAnimal);
  }

  sortOptions = [
    { label: 'Name', value: 'name' },
    // Add more sorting options as needed
  ];

  sortField = 'name';
  sortOrder = 1;  // 1 for ascending, -1 for descending

  onSortChange(event: any) {
    this.sortField = event.value;
  }

}
