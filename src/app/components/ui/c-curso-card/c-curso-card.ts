import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CourseInterface } from '../../../models/CourseInterface';

@Component({
  selector: 'c-curso-card',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './c-curso-card.html',
  styleUrl: './c-curso-card.scss',
})
export class CCursoCard {
  @Input() curso!: CourseInterface;

  get usuarioNombre(): string {
    return this.curso?.teacher?.username || '';
  }
}
