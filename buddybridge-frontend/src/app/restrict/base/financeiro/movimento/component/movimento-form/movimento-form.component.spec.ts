import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoFormComponent } from './movimento-form.component';

describe('MovimentoFormComponent', () => {
  let component: MovimentoFormComponent;
  let fixture: ComponentFixture<MovimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
