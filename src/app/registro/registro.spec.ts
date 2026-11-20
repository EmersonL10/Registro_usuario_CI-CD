
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registro } from './registro';
import { vi } from 'vitest';

describe('Registro de usuarios', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  
  it('debe crear correctamente el componente Registro', () => {
    expect(component).toBeTruthy();
    expect(component.formulario).toBeTruthy();
  });

  
  it('debe impedir el registro cuando todos los campos están vacíos', () => {
    const boton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    expect(component.formulario.invalid).toBe(true);
    expect(boton.disabled).toBe(true);
  });


  it('debe rechazar el formulario si falta el nombre', () => {
    component.formulario.setValue({
      nombre: '',
      apellido: 'Perez',
      correo: 'carlos@gmail.com',
      contrasena: 'Carlos123',
    });

    expect(component.formulario.controls.nombre.hasError('required'))
      .toBe(true);

    expect(component.formulario.invalid).toBe(true);
  });


  it('debe rechazar un correo electrónico con formato inválido', () => {
    component.formulario.controls.correo.setValue('correo_invalido');

    expect(component.formulario.controls.correo.hasError('email'))
      .toBe(true);
  });


  it('debe rechazar una contraseña de 7 caracteres', () => {
    component.formulario.controls.contrasena.setValue('1234567');

    expect(component.formulario.controls.contrasena.hasError('minlength'))
      .toBe(true);
  });


  it('debe aceptar una contraseña de exactamente 8 caracteres', () => {
    component.formulario.controls.contrasena.setValue('12345678');

    expect(component.formulario.controls.contrasena.valid).toBe(true);
  });


  it('debe aceptar todos los datos cuando cumplen las validaciones', () => {
    component.formulario.setValue({
      nombre: 'Carlos',
      apellido: 'Perez',
      correo: 'carlos@gmail.com',
      contrasena: 'Carlos123',
    });

    expect(component.formulario.valid).toBe(true);
  });


  it('debe habilitar el botón cuando el formulario es válido', () => {
    component.formulario.setValue({
      nombre: 'Carlos',
      apellido: 'Perez',
      correo: 'carlos@gmail.com',
      contrasena: 'Carlos123',
    });

    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    expect(component.formulario.valid).toBe(true);
    expect(boton.disabled).toBe(false);
  });

  
  it('no debe procesar el registro cuando el formulario es inválido', () => {
    const consola = vi.spyOn(console, 'log').mockImplementation(() => {});

    try {
      component.registrar();

      expect(component.formulario.invalid).toBe(true);
      expect(consola).not.toHaveBeenCalled();
    } finally {
      consola.mockRestore();
    }
  });

  
  
it('debe ejecutar la lógica de registro al enviar datos válidos', () => {
  component.formulario.setValue({
    nombre: 'Carlos',
    apellido: 'Perez',
    correo: 'carlos@gmail.com',
    contrasena: 'Carlos123',
  });

  fixture.detectChanges();

  // Comprobar que los datos son válidos antes del envío
  expect(component.formulario.valid).toBe(true);

  const consola = vi.spyOn(console, 'log').mockImplementation(() => {});

  try {
    const formularioHTML = fixture.nativeElement.querySelector(
      'form'
    ) as HTMLFormElement;

    formularioHTML.dispatchEvent(
      new Event('submit', {
        bubbles: true,
        cancelable: true,
      })
    );

    fixture.detectChanges();

    // Verificar que se ejecutó el registro
    expect(consola).toHaveBeenCalledWith('Registro válido');

    // Verificar el mensaje de confirmación
    expect(component.mensajeExito).toBe('¡Cuenta creada correctamente!');

    // Verificar que los campos quedaron vacíos
    expect(component.formulario.value.nombre).toBeNull();
    expect(component.formulario.value.apellido).toBeNull();
    expect(component.formulario.value.correo).toBeNull();
    expect(component.formulario.value.contrasena).toBeNull();

    // Verificar que el formulario está listo para otro registro
    expect(component.formulario.invalid).toBe(true);

    // Verificar que el mensaje aparece en pantalla
    const mensaje = fixture.nativeElement.querySelector(
      '.mensaje-exito'
    ) as HTMLElement;

    expect(mensaje.textContent).toContain('¡Cuenta creada correctamente!');

  } finally {
    consola.mockRestore();
  }
});

});
