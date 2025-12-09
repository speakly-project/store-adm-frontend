import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCurso } from './mod-curso';

describe('ModCurso', () => {
  let component: ModCurso;
  let fixture: ComponentFixture<ModCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
