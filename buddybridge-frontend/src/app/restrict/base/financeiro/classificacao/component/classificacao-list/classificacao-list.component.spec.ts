import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoListComponent } from './classificacao-list.component';

describe('ClassificacaoListComponent', () => {
  let component: ClassificacaoListComponent;
  let fixture: ComponentFixture<ClassificacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificacaoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
