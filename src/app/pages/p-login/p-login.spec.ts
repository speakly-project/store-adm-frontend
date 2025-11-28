import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PLogin } from './p-login';

describe('PLogin', () => {
  let component: PLogin;
  let fixture: ComponentFixture<PLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
