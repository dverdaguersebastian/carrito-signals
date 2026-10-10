import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CarritoSignalsComponent } from './components/carrito-signals/carrito-signals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, CarritoSignalsComponent],
  template: `
    <ion-app>
      <app-carrito-signals />
    </ion-app>
  `
})
export class AppComponent {}
