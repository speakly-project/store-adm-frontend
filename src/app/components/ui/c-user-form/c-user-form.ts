import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../models/UserInterface';
import { Boton } from '../c-boton/c-boton';

@Component({
  selector: 'c-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Boton
  ],
  templateUrl: './c-user-form.html',
  styleUrl: './c-user-form.scss',
})
export class CUserForm {
  @Input() user!: UserInterface;
  @Input() modoEdicion: boolean = true;
  @Output() guardar = new EventEmitter<UserInterface>();
  @Output() cancelar = new EventEmitter<void>();

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.crearFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.formulario) {
      return;
    }

    if (changes['modoEdicion']) {
      const passwordControl = this.formulario.get('password');
      if (passwordControl) {
        passwordControl.clearValidators();
        if (!this.modoEdicion) {
          passwordControl.addValidators([Validators.required, Validators.minLength(6)]);
        }
        passwordControl.updateValueAndValidity({ emitEvent: false });
      }

      if (!this.modoEdicion) {
        this.formulario.patchValue(
          {
            role: '',
            password: '',
          },
          { emitEvent: false }
        );
      } else {
        this.formulario.patchValue(
          {
            role: this.user?.role ?? '',
          },
          { emitEvent: false }
        );
      }
    }

    if (changes['user']?.currentValue) {
      this.formulario.patchValue(
        {
          username: this.user?.username ?? '',
          email: this.user?.email ?? '',
          profilePictureUrl: this.user?.profilePictureUrl ?? '',
          role: this.modoEdicion ? (this.user?.role ?? '') : '',
        },
        { emitEvent: false }
      );
    }
  }

  crearFormulario(): void {
    const initialRole = this.modoEdicion ? (this.user?.role || '') : '';
    const initialPassword = this.modoEdicion ? (this.user?.password || '') : '';

    this.formulario = this.formBuilder.group({
      username: [this.user.username || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      profilePictureUrl: [this.user.profilePictureUrl || ''],
      role: [initialRole, Validators.required],
      password: [initialPassword, this.modoEdicion ? [] : [Validators.required, Validators.minLength(6)]]
    });
  }

  onGuardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const password = this.modoEdicion ? this.user.password : this.formulario.value.password;

    const userActualizado: UserInterface = {
      ...this.user,
      username: this.formulario.value.username,
      email: this.formulario.value.email,
      profilePictureUrl: this.formulario.value.profilePictureUrl,
      role: this.formulario.value.role,
      password,
    };

    this.guardar.emit(userActualizado);
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
