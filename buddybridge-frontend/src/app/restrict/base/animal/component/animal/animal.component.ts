import {Component} from "@angular/core";
import {Animal} from "../../model/animal";
import {AnimalService} from "../../service/animal.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss'
})
export class AnimalComponent {
  animals!: Animal[]

  constructor(
    private animalService: AnimalService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.animalService.getAnimals().subscribe((data: Animal[]) => {
      this.animals! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addanimal'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editanimal', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.animalService.deleteAnimal(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/animal')
    })
  }
}
