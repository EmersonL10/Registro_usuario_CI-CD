import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})


export class Registro {

  private fb = new FormBuilder();

  mensajeExito = '';

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
  });

  registrar() {
  if (this.formulario.invalid) {
    return;
  }

  console.log('Registro válido');

  this.mensajeExito = '¡Cuenta creada correctamente!';

  this.formulario.reset();
}
}
