import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoFormComponent } from './classificacao-form.component';

describe('ClassificacaoFormComponent', () => {
  let component: ClassificacaoFormComponent;
  let fixture: ComponentFixture<ClassificacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificacaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
