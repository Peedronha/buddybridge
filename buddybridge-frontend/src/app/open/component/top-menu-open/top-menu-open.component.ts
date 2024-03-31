import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../layout/service/app.layout.service';

@Component({
  selector: 'app-top-menu-open',
  templateUrl: './top-menu-open.component.html',
  styleUrl: './top-menu-open.component.scss'
})
export class TopMenuOpenComponent {

  constructor(public layoutService: LayoutService, public router: Router) { }

}
