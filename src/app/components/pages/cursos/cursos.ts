import { Component } from '@angular/core';
import { CoursesHttpClient } from '../../../services/courses-http-client';
import { ActivatedRoute, Route, Router, RouterLink } from "@angular/router";
import { CourseInterface } from '../../../models/CourseInterface';
import { LanguageInterface } from '../../../models/LanguageInterface';
import { LevelInterface } from '../../../models/LevelInterface';
import { MatDialog } from '@angular/material/dialog';
import { CCursoDialog } from '../../ui/c-curso-dialog/c-curso-dialog';
import { Boton } from '../../ui/c-boton/c-boton';
import { CTag } from '../../ui/c-tag/c-tag';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'cursos',
  imports: [RouterLink, Boton, CTag, DatePipe],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class Cursos {
  constructor(private dialog: MatDialog, private coursesHttpClient: CoursesHttpClient, private router: Router) { }

  courses!: CourseInterface[];
  allCourses!: CourseInterface[];
  languages!: LanguageInterface[];
  levels!: LevelInterface[];

  selectedLanguage: string = 'All';
  selectedLevel: string = 'All';

  ngOnInit() {
    this.coursesHttpClient.getAllCoursesWithTeachers().subscribe((data: any) => {
      this.courses = data;
      this.allCourses = data;
    });
    this.coursesHttpClient.getAllLanguages().subscribe((data: any) => {
      this.languages = data;
    });
    this.coursesHttpClient.getAllLevels().subscribe((data: any) => {
      this.levels = data;
    });
  }
  ngOnDestroy() {
  }

  loadCourses() {
    const language = this.selectedLanguage;
    const level = this.selectedLevel;

    this.courses = this.allCourses.filter(curso => {
      const matchLanguage = language === 'All' || curso.language === language;
      const matchLevel = level === 'All' || curso.level === level;
      return matchLanguage && matchLevel;
    });
  }

  onLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedLanguage = select.value;
    this.loadCourses();
  }

  onLevelChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedLevel = select.value;
    this.loadCourses();
  }
  verCurso(id: number) {
    this.openCursoDialog(id, 'ver');
  }

  modificarCurso(id: number) {
    this.openCursoDialog(id, 'modificar');
  }

  borrarCurso(id: number) {
    this.openCursoDialog(id, 'borrar');
  }

  openCursoDialog(id: number, accion: 'ver' | 'modificar' | 'borrar') {
    const curso = this.courses.find(c => c.id === id);

    if (!curso) return;

    const dialogRef = this.dialog.open(CCursoDialog, {
      data: { curso, accion },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch(result) {
          case 'ver':
            break;
          case 'modificar':
            this.ejecutarModificacion(curso);
            break;
          case 'borrar':
            this.ejecutarBorrado(id);
            break;
        }
      }
    });
  }

  ejecutarModificacion(cursoActualizado: CourseInterface) {
    // Excluir createdAt y teacher del objeto para el backend
    const { createdAt, teacher, ...cursoParaBackend } = cursoActualizado;
    
    this.coursesHttpClient.updateCourse(cursoActualizado.id, { ...cursoParaBackend, teacherId: cursoActualizado.teacherId }).subscribe({
      next: () => {
        const index = this.courses.findIndex(c => c.id === cursoActualizado.id);
        if (index !== -1) {
          this.courses[index] = cursoActualizado;
          this.courses = [...this.courses];
        }
        console.log('Curso actualizado exitosamente');
      },
      error: (error: any) => {
        console.error('Error al actualizar el curso:', error);
      }
    });
  }

  ejecutarBorrado(id: number) {
    this.coursesHttpClient.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(curso => curso.id !== id);
        console.log('Curso borrado exitosamente');
      },
      error: (error: any) => {
        console.error('Error al borrar el curso:', error);
      }
    });
  }

}