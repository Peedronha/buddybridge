import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoacessoFormComponent } from './grupoacesso-form.component';

describe('GrupoacessoFormComponent', () => {
  let component: GrupoacessoFormComponent;
  let fixture: ComponentFixture<GrupoacessoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoacessoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoacessoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
