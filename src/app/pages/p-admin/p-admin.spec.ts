import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAdmin } from './p-admin';

describe('PAdmin', () => {
  let component: PAdmin;
  let fixture: ComponentFixture<PAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
