import { Component } from '@angular/core';
import { CoursesHttpClient } from '../../../services/courses-http-client';
import { ActivatedRoute, Route, Router, RouterLink } from "@angular/router";
import { CourseInterface } from '../../../models/CourseInterface';
import { LanguageInterface } from '../../../models/LanguageInterface';
import { LevelInterface } from '../../../models/LevelInterface';
import { MatDialog } from '@angular/material/dialog';
import { CCursoDialog } from '../../ui/c-curso-dialog/c-curso-dialog';


@Component({
  selector: 'cursos',
  imports: [RouterLink],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class Cursos {
  constructor(private dialog: MatDialog, private coursesHttpClient: CoursesHttpClient, private router: Router) { }

  cursos!: CourseInterface[];
  languages!: LanguageInterface[];
  levels!: LevelInterface[];

  selectedLanguage: string = 'All';
  selectedLevel: string = 'All';

  ngOnInit() {
    this.loadCourses();
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

    if (language === 'All' && level === 'All') {
      this.coursesHttpClient.getAllCourses().subscribe((data: any) => {
        this.cursos = data;
      });
    } else if (language !== 'All' && level !== 'All') {
      this.coursesHttpClient.getCoursesByLanguageAndLevel(language, level).subscribe((data: any) => {
        this.cursos = data;
      });
    } else if (language !== 'All') {
      this.coursesHttpClient.getCoursesByLanguage(language).subscribe((data: any) => {
        this.cursos = data;
      });
    } else if (level !== 'All') {
      this.coursesHttpClient.getCoursesByLevel(level).subscribe((data: any) => {
        this.cursos = data;
      });
    }
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
    const curso = this.cursos.find(c => c.id === id);
    
    if (!curso) return;
    
    const dialogRef = this.dialog.open(CCursoDialog, {
      data: { curso, accion },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch(result) {
          case 'ver':
            console.log('Vista del curso cerrada');
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

  ejecutarModificacion(curso: CourseInterface) {
    // Lógica para modificar el curso
    console.log('Modificando curso:', curso);
    //pet HTTP para actualizar
  }

  ejecutarBorrado(id: number) {
    this.coursesHttpClient.deleteCourse(id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter(curso => curso.id !== id);
        console.log('Curso borrado exitosamente');
      },
      error: (error: any) => {
        console.error('Error al borrar el curso:', error);
      }
    });
  }

}