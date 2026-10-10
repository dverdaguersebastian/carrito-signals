import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    // Arquitectura Zoneless: Angular 18+ prescindiendo totalmente de Zone.js
    provideExperimentalZonelessChangeDetection(),
    provideIonicAngular({
      mode: 'md' // Diseño Material Design consistente en cualquier dispositivo
    })
  ]
};
