import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormSenhaComponent } from './account-form-senha.component';

describe('AccountFormSenhaComponent', () => {
  let component: AccountFormSenhaComponent;
  let fixture: ComponentFixture<AccountFormSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountFormSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountFormSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
