import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoacessoListComponent } from './solicitacaoacesso-list.component';

describe('SolicitacaoacessoListComponent', () => {
  let component: SolicitacaoacessoListComponent;
  let fixture: ComponentFixture<SolicitacaoacessoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoacessoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitacaoacessoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
