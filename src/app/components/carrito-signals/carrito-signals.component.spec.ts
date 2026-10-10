import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CarritoSignalsComponent } from './carrito-signals.component';

describe('CarritoSignalsComponent - Pruebas de Validación Curricular (CE 3.e)', () => {
  let component: CarritoSignalsComponent;
  let fixture: ComponentFixture<CarritoSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoSignalsComponent],
      providers: [
        // Configuración de arquitectura Zoneless para el entorno de pruebas
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe instanciarse correctamente el componente visual', () => {
    expect(component).toBeTruthy();
  });

  it('2. Debe inicializar el estado reactivo con 2 productos predeterminados y calcular precioTotal en 209€', () => {
    const items = component.productos();
    expect(items.length).toBe(2);
    expect(items[0]).toEqual({ id: 1, nombre: 'Licencia IDE', precio: 89 });
    expect(items[1]).toEqual({ id: 2, nombre: 'Teclado Mecánico', precio: 120 });

    // Verificación de la señal computada (89 + 120 = 209)
    expect(component.precioTotal()).toBe(209);
  });

  it('3. Debe añadir un producto aleatorio mediante .update() manteniendo inmutabilidad y recalculando precioTotal', () => {
    const totalInicial = component.precioTotal();
    const referenciaPrevia = component.productos();

    component.agregarProductoAleatorio();

    const productosActuales = component.productos();
    // Verificación de tamaño
    expect(productosActuales.length).toBe(3);

    // Verificación de inmutabilidad (nueva referencia en memoria, no mutación in-place)
    expect(productosActuales).not.toBe(referenciaPrevia);

    // Cada producto aleatorio tiene un precio de 250€
    expect(component.precioTotal()).toBe(totalInicial + 250);
  });

  it('4. Debe eliminar un producto por su id y recalcular precioTotal de forma reactiva', () => {
    // Eliminamos el producto con id: 1 (precio: 89)
    component.eliminarProducto(1);

    const productosRestantes = component.productos();
    expect(productosRestantes.length).toBe(1);
    expect(productosRestantes[0].id).toBe(2);

    // Total recalculado automáticamente por computed()
    expect(component.precioTotal()).toBe(120);
  });

  it('5. Debe manejar el carrito vacío y reflejar el bloque @empty', () => {
    component.eliminarProducto(1);
    component.eliminarProducto(2);

    expect(component.productos().length).toBe(0);
    expect(component.precioTotal()).toBe(0);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('[data-testid="badge-total"]');
    expect(badge?.textContent).toContain('Total: 0€');

    const vacio = compiled.querySelector('[data-testid="carrito-vacio"]');
    expect(vacio).toBeTruthy();
  });

  it('6. Debe ejecutar effect() al inicializar y al mutar el estado', () => {
    const spyConsole = spyOn(console, 'log');

    // Provocamos un cambio de estado y notificamos el ciclo de detección
    component.agregarProductoAleatorio();
    fixture.detectChanges();

    expect(spyConsole).toHaveBeenCalledWith(
      jasmine.stringMatching(/Estado actual del carrito guardado/)
    );
  });
});
