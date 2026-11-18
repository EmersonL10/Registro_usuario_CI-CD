import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe iniciar con el formulario inválido', ()=>{
    expect(component.formulario.invalid).toBe(true);
  })


  it('debe rechazar un correo inválido', ()=>{
    component.formulario.controls.correo.setValue('correo_invalido');

    expect(component.formulario.controls.correo.invalid).toBe(true);
  })

  it('debe rechazar una contraseña menor a 8 caracteres', () => {
  component.formulario.controls.contrasena.setValue('12345');

  expect(component.formulario.controls.contrasena.invalid).toBe(true);
  });

  it('debe aceptar un formulario válido', () => {
  component.formulario.setValue({
    nombre: 'Carlos',
    apellido: 'Perez',
    correo: 'carlos@gmail.com',
    contrasena: 'Carlos123'
  });

  expect(component.formulario.valid).toBe(true);
  });


});
