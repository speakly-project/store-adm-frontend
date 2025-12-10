import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCursoDialog } from './ver-curso-dialog';

describe('VerCursoDialog', () => {
  let component: VerCursoDialog;
  let fixture: ComponentFixture<VerCursoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCursoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCursoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
