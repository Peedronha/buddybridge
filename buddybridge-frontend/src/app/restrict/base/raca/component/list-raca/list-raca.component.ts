import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Raca} from "../../model/raca.model";
import {RacaService} from "../../service/raca.service";

@Component({
  selector: 'app-list-raca',
  templateUrl: './list-raca.component.html',
  styleUrl: './list-raca.component.scss'
})
export class ListRacaComponent {

  @Input() racas!: Raca[];
  _specificRaca: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  editForm = this.fb.group({
    id_raca: [''],
    nome_raca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    id_tipo: ['']
  });


  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private racaService: RacaService, private router: Router) {

  }


  ngOnInit(): void {
    this.racaService.getRacas().subscribe((data: Raca[]) => {
      console.log(data)
      this.racas = data;
    });
  }


  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(id_raca: any) {
    alert("id_raca: "+id_raca)
    this.edit.emit(id_raca);
  }

  onDelete(id_raca: any) {
    this.remove.emit(id_raca);
  }
}
