import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseInterface } from '../../../models/CourseInterface';

@Component({
  selector: 'app-dialogo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ver-curso-dialog.html',
  styleUrl: './ver-curso-dialog.scss',
})
export class VerCursoDialog {

  constructor(
    public dialogRef: MatDialogRef<VerCursoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CourseInterface
  ){}

  cerrar(): void {
    this.dialogRef.close();
  }

  seleccionarAccion(accion: string): void {
    this.dialogRef.close(accion);
  }
}
