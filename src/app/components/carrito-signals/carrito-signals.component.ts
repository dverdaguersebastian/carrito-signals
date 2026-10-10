import {
  Component,
  computed,
  effect,
  signal,
  ChangeDetectionStrategy,
  WritableSignal,
  Signal
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito-signals',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización crítica: reactividad granular
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonBadge
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Carrito Reactivo</ion-title>
        <!-- Lectura de la señal computada en el template usando () -->
        <ion-badge slot="end" color="tertiary" class="ion-margin-end" data-testid="badge-total">
          Total: {{ precioTotal() }}€
        </ion-badge>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <!-- Nuevo Control Flow de Angular con track para reconciliación del DOM -->
        @for (prod of productos(); track prod.id) {
          <ion-item [attr.data-testid]="'producto-item-' + prod.id">
            <ion-label>
              <h2>{{ prod.nombre }}</h2>
              <p>{{ prod.precio }}€</p>
            </ion-label>
            <ion-button
              fill="clear"
              color="danger"
              (click)="eliminarProducto(prod.id)"
              [attr.data-testid]="'btn-eliminar-' + prod.id"
            >
              Eliminar
            </ion-button>
          </ion-item>
        } @empty {
          <ion-item data-testid="carrito-vacio">
            <ion-label class="ion-text-center">El carrito está vacío</ion-label>
          </ion-item>
        }
      </ion-list>

      <div class="ion-padding">
        <ion-button
          expand="block"
          (click)="agregarProductoAleatorio()"
          data-testid="btn-agregar"
        >
          Añadir Producto Random
        </ion-button>
      </div>
    </ion-content>
  `
})
export class CarritoSignalsComponent {
  // 1. Estado Writable (WritableSignal)
  public productos: WritableSignal<Producto[]> = signal<Producto[]>([
    { id: 1, nombre: 'Licencia IDE', precio: 89 },
    { id: 2, nombre: 'Teclado Mecánico', precio: 120 }
  ]);

  // 2. Estado Derivado (Computed Signal) - Se recalcula solo si 'productos' cambia
  public precioTotal: Signal<number> = computed(() => {
    return this.productos().reduce((total, prod) => total + prod.precio, 0);
  });

  constructor() {
    // 3. Efecto Secundario (Effect) - Se ejecuta en la inicialización y cada vez que 'productos' cambie
    effect(() => {
      console.log(
        `[Persistencia] Estado actual del carrito guardado. Items: ${this.productos().length}`
      );
      // Aquí se integraría Preferences API de Capacitor para persistir localmente
    });
  }

  // Métodos de mutación de estado
  public agregarProductoAleatorio(): void {
    const nuevoId = Math.floor(Math.random() * 1000) + 3;
    const nuevoProducto: Producto = {
      id: nuevoId,
      nombre: `Monitor ${nuevoId}`,
      precio: 250
    };

    // Mutación usando .update() - Inmutabilidad recomendada
    this.productos.update((estadoAnterior) => [...estadoAnterior, nuevoProducto]);
  }

  public eliminarProducto(id: number): void {
    this.productos.update((estadoAnterior) =>
      estadoAnterior.filter((p) => p.id !== id)
    );
  }
}
