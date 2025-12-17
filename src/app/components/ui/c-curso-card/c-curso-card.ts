import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CourseInterface } from '../../../models/CourseInterface';
import { CoursesHttpClient } from '../../../services/courses-http-client';
import { UserInterface } from '../../../models/UserInterface';
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

  constructor( private coursesHttpClient: CoursesHttpClient) { }

  usuarioNombre!: string;

  ngOnInit() {
    this.coursesHttpClient.getUserById(this.curso.teacherId).subscribe((user: UserInterface) => {
      this.usuarioNombre = user.username;
    });
  }
}
