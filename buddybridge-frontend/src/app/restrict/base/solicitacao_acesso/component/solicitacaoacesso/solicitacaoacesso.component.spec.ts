import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoacessoComponent } from './solicitacaoacesso.component';

describe('SolicitacaoacessoComponent', () => {
  let component: SolicitacaoacessoComponent;
  let fixture: ComponentFixture<SolicitacaoacessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoacessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitacaoacessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
