import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {RacaService} from "../../../raca/service/raca.service";
import {Router} from "@angular/router";
import {Tipo} from "../../model/tipo.model";
import {TipoService} from "../../service/tipo.service";

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrl: './list-tipo.component.scss'
})
export class ListTipoComponent {

  @Input() tipos!: Tipo[];
  _specificTipo: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  editForm = this.fb.group({
    id_tipo: [''],
    nome_raca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
  });


  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private tipoService: TipoService, private router: Router) {

  }


  ngOnInit(): void {
    this.tipoService.getTipos().subscribe((data: Tipo[]) => {
      console.log(data)
      this.tipos = data;
    });
  }


  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(id_tipo: any) {
    alert("id_tipo: "+id_tipo)
    this.edit.emit(id_tipo);
  }

  onDelete(id_tipo: any) {
    this.remove.emit(id_tipo);
  }
}