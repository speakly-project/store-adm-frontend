import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseInterface } from '../../../models/CourseInterface';
import { Boton } from '../c-boton/c-boton';
import { CoursesHttpClient } from '../../../services/courses-http-client';
import { LanguageInterface } from '../../../models/LanguageInterface';
import { LevelInterface } from '../../../models/LevelInterface';

@Component({
  selector: 'c-curso-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Boton
  ],
  templateUrl: './c-curso-form.html',
  styleUrl: './c-curso-form.scss',
})
export class CCursoForm {
  @Input() curso!: CourseInterface;
  @Input() modoEdicion: boolean = true;
  @Output() guardar = new EventEmitter<CourseInterface>();
  @Output() cancelar = new EventEmitter<void>();

  formulario!: FormGroup;
  teacherName!: string;
  allLanguages: LanguageInterface[] = [];
  allLevels: LevelInterface[] = [];
  constructor(private formBuilder: FormBuilder, private coursesHttpClient: CoursesHttpClient) {
  }
  
  ngOnInit() {
    this.crearFormulario();
    this.coursesHttpClient.getUserById(this.curso.teacherId).subscribe((user) => {
      this.teacherName = user.username;
      this.formulario.patchValue({
        teacher: this.teacherName
      }, { emitEvent: false });
    });
    this.coursesHttpClient.getAllLanguages().subscribe((data: LanguageInterface[]) => {
      this.allLanguages = data;
    });
    this.coursesHttpClient.getAllLevels().subscribe((data: LevelInterface[]) => {
      this.allLevels = data;
    });
  }
  
  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      title: [this.curso.title, [Validators.required, Validators.minLength(3)]],
      description: [this.curso.description, [Validators.required, Validators.minLength(10)]],
      price: [this.curso.price, [Validators.required, Validators.min(0)]],
      durationHours: [this.curso.duration, [Validators.required, Validators.min(1)]],
      language: [this.curso.language, Validators.required],
      level: [this.curso.level, Validators.required],
      teacher: ['', Validators.required]
    });
  }

  onGuardar(): void {
    if (this.formulario.valid) {
      const cursoActualizado: CourseInterface = {
        ...this.curso,
        title: this.formulario.value.title,
        description: this.formulario.value.description,
        price: this.formulario.value.price,
        duration: this.formulario.value.durationHours,
        language: this.formulario.value.language,
        level: this.formulario.value.level
      };
      
      this.coursesHttpClient.updateCourse(this.curso.id, cursoActualizado).subscribe({
        next: (response) => {
          Object.assign(this.curso, cursoActualizado);
          this.guardar.emit(cursoActualizado);
        },
        error: (error) => {
          console.error('Error al actualizar el curso:', error);
        }
      });
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
