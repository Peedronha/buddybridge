import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../../service/animal.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {AnimalModel} from "../../model/animal.model";
import {FormBuilder, Validators} from "@angular/forms";
import {Raca} from "../../../raca/model/raca.model";
import {Tipo} from "../../../tipo_animal/model/tipo.model";
import {TipoService} from "../../../tipo_animal/service/tipo.service";
import {RacaService} from "../../../raca/service/raca.service";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {

  registerForm = this.fb.group({
    id_animal: [''],
    nome_animal: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    ]],
    peso_animal: ['', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]],
    comprimento_animal: ['', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]],
    data_resgate: ['', Validators.required],
    data_nascimento: ['', Validators.required],
    tipo_animal: ['', Validators.required],
    raca_animal: ['', Validators.required],
    caracteristicas_animal: [''],
    localizacao_animal: [''],
  });

  racas: Raca[] = [];
  tipos: Tipo[] = [];

  tipoId: any;
  tipoRaca: any;

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private tipoService: TipoService,
    private racaService: RacaService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const animal: AnimalModel = this.router.snapshot.data['animal'];

    this.tipoService.getTipos().subscribe(tipos => {
      this.tipos = tipos;
    });

    this.registerForm.setValue({
      id_animal: animal.id_animal + '',
      nome_animal: animal.nome_animal + '',
      peso_animal: animal.peso_animal + '',
      comprimento_animal: animal.comprimento_animal,
      data_resgate: this.formatDate(animal.data_resgate),
      data_nascimento: this.formatDate(animal.data_nascimento),
      tipo_animal: animal.tipo_animal + '',
      raca_animal: animal.raca_animal + '',
      caracteristicas_animal: animal.caracteristicas_animal + '',
      localizacao_animal: animal.localizacao_animal + '',
    });
    if (animal.raca_animal != ''){
      this.tipoId = animal.tipo_animal;
      this.loadRacas(this.tipoId.name)
      this.tipoRaca = animal.raca_animal;
    }
  }

  loadRacas(tipoId: any): void {
    this.racaService.getRacesByType(tipoId).subscribe(
      data => {
        this.racas = data;
      },
      error => {
        console.error(error);
      }
    );
  }
  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }
  onTipoAnimalChange(event: any): void {
    this.tipoId = event.value;
    if (this.tipoId) {
      this.loadRacas(this.tipoId.name);
    } else {
      this.racas = [];
    }
  }

  submitDetails() {
    let animal = new AnimalModel();

    var id = this.registerForm.get('id_animal')?.value + '';
    animal.id_animal = parseInt(id);
    animal.nome_animal = this.registerForm.get('nome_animal')?.value + '';
    animal.comprimento_animal = this.registerForm.get('comprimento_animal')?.value + '';
    animal.peso_animal = this.registerForm.get('peso_animal')?.value + '';
    animal.data_nascimento = this.registerForm.get('data_nascimento')?.value + '';
    animal.data_resgate = this.registerForm.get('data_resgate')?.value + '';
    animal.raca_animal = this.tipoRaca.id || '';
    animal.tipo_animal = this.tipoId.id || '';
    animal.caracteristicas_animal = this.registerForm.get('caracteristicas_animal')?.value + '';
    animal.localizacao_animal = this.registerForm.get('localizacao_animal')?.value + '';
    animal.genero = 'Neutro'

    if (this.registerForm.get('id_animal')?.value + '' != 'NaN') {
      this.animalService.updateanimal(animal).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Animal atualizado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/animal');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar o animal'
          });
        }
      );
    } else {
      animal.id_animal = undefined;
      this.animalService.registerAnimal(animal).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Animal registrado!' });
          this.registerForm.reset();
          this.route.navigateByUrl('/animal');
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao validar o animal.'
          });
        }
      );
    }
  }

  get id_animal() {
    return this.registerForm.get('id_animal');
  }

  get nome_animal() {
    return this.registerForm.get('nome_animal');
  }

  get peso_animal() {
    return this.registerForm.get('peso_animal');
  }

  get comprimento_animal() {
    return this.registerForm.get('comprimento_animal');
  }

  get data_resgate() {
    return this.registerForm.get('data_resgate');
  }

  get data_nascimento() {
    return this.registerForm.get('data_nascimento');
  }

  get tipo_animal() {
    return this.registerForm.get('tipo_animal');
  }

  get raca_animal() {
    return this.registerForm.get('raca_animal');
  }
}
