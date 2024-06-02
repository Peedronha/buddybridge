import { Component } from '@angular/core';
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

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.scss'
})
export class AnimalFormComponent {

  registerForm = this.fb.group({
    id_animal:[''],
    nome_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    raca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    idade: ['', Validators.required, Validators.pattern(/^\d{1,20}$/)],
    peso_animal: ['', Validators.required, Validators.pattern(/^\d{1,100}$/)],
    comprimento_animal: ['', [Validators.required, Validators.pattern(/^\d{1,2000}$/)]],
    data_resgate: ['', Validators.required],
    tipo_animal:[''],
    raca_animal:[''],
  })

  racas: Raca[] = [];

  tipos: Tipo[] = [];

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private tipoService: TipoService,
    private racaService: RacaService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private accountService : AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.validarSessao();
    const animal: AnimalModel = this.router.snapshot.data['animal'];
    console.log("ngOnInit: "+JSON.stringify(animal));

    this.tipoService.getTipos().subscribe(tipos => {
        this.tipos = tipos;
      }); //Popular as raças

    //Event listener para mudar as raças quando selecionar um tipo de animal
    // this.registerForm.get('tipo_animal')?.valueChanges.subscribe(value => {
    //   alert("ngOnInit tipo: "+JSON.stringify(value))
    //   if (value) {
    //     this.loadRacas(value);
    //   } else {
    //     this.racas = [];
    //   }
    // });

    this.registerForm.setValue({
      id_animal: animal.id_animal +'',
      nome_animal: animal.nome_animal + '',
      raca: animal.raca,
      idade: animal.idade + '',
      peso_animal: animal.peso_animal,
      comprimento_animal: animal.comprimento_animal,
      data_resgate: animal.data_resgate,
      tipo_animal: animal.tipo_animal+'',
      raca_animal: animal.raca_animal+''
    })
  }

  loadRacas(tipoId: any): void {
    alert("load "+ JSON.stringify(tipoId))
    this.racaService.getRacesByType(tipoId).subscribe(
      data => {
        this.racas = data;
      },
      error => {
        console.error(error);
      }
    );
  }


  onTipoAnimalChange(event: any): void {
    alert("onTipoAnimalChange tipo: "+JSON.stringify(event))
    const tipoId = event.value;
    if (tipoId) {
      this.loadRacas(tipoId.name);
    } else {
      this.racas = [];
    }
  }

  submitDetails() {
    alert(this.registerForm.get('id_animal')?.value+'');

    let animal = new AnimalModel();

    var id = this.registerForm.get('id_animal')?.value+'';
    animal.id_animal = parseInt(id);
    animal.nome_animal = this.registerForm.get('nome_animal')?.value+'';
    animal.comprimento_animal = this.registerForm.get('comprimento_animal')?.value+'';
    animal.peso_animal = this.registerForm.get('peso_animal')?.value +'';
    animal.data_resgate = this.registerForm.get('data_resgate')?.value + '';
    animal.raca = this.registerForm.get('raca')?.value + '';
    animal.idade = this.registerForm.get('idade')?.value + '';

    console.log(animal);

    if (this.registerForm.get('id_animal')?.value + '' != 'NaN'){
      this.animalService.updateanimal(animal).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso' });
          this.registerForm.reset();
          this.route.navigateByUrl('/animal')
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um usuário com este CPF / Email cadastrado no sistema' });
        },
      )
    } else {
      animal.id_animal = undefined
      this.animalService.registerAnimal(animal).subscribe(
        response => {
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registrado com sucesso!'});
          this.registerForm.reset();
          this.route.navigateByUrl('/animal')
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Já existe um usuário cadastrado no sistema com este email.'});
        },
      )
    }
  }


  get id_animal() {
    return this.registerForm.get('id_animal');
  }

  get nome_animal() {
    return this.registerForm.get('nome_animal');
  }

  get idade() {
    return this.registerForm.get('idade');
  }

  get raca() {
    return this.registerForm.get('raca');
  }

  get data_resgate() {
    return this.registerForm.get('data_resgate');
  }

  get peso_animal() {
    return this.registerForm.get('peso_animal');
  }

  get comprimento_animal() {
    return this.registerForm.get('comprimento_animal');
  }
  get tipo_animal() {
    return this.registerForm.get('tipo_animal');
  }
  get raca_animal() {
    return this.registerForm.get('raca_animal');
  }
}
