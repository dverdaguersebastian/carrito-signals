# Carrito Reactivo con Angular Signals & Ionic

Proyecto práctico para el módulo **Desarrollo de Interfaces (0488)** del Ciclo Formativo de Grado Superior en **Desarrollo de Aplicaciones Multiplataforma (DAM)**.

---

## Estructura del Proyecto

```text
carrito-signals/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── carrito-signals/
│   │   │       ├── carrito-signals.component.ts      <-- Lógica reactiva (signal, computed, effect)
│   │   │       └── carrito-signals.component.spec.ts <-- Pruebas unitarias de validación (CE 3.e)
│   │   ├── models/
│   │   │   └── producto.model.ts                     <-- Definición de la interfaz Producto
│   │   ├── app.component.ts                          <-- Componente raíz Ionic Standalone
│   │   └── app.config.ts                             <-- Configuración Zoneless y providers
│   ├── index.html
│   ├── main.ts                                       <-- Bootstrap de la aplicación standalone
│   └── styles.css                                    <-- Estilos globales e Ionic CSS
├── package.json
├── tsconfig.json
└── README.md
```

---

## Trazabilidad con Criterios de Evaluación (Comunidad de Madrid)

1. **RA 1 - CE 1.a & CE 1.b (Arquitecturas y Patrones de Diseño):**
   * Se sustituye la arquitectura de *Dirty Checking* con `Zone.js` por una arquitectura reactiva **Zoneless** mediante señales.
   * Se utiliza el patrón **Productor-Consumidor**: `signal()` como productor de estado, `computed()` como derivador memoizado (evaluación perezosa) y `effect()` para efectos secundarios.
   * Se garantiza la inmutabilidad en las transformaciones de estado mediante el operador *spread* `[...]` y `.filter()`.

2. **RA 3 - CE 3.d (Asociación de Acciones a Eventos):**
   * Enlaces de eventos directos `(click)="agregarProductoAleatorio()"` y `(click)="eliminarProducto(prod.id)"`.
   * Uso del nuevo bloque de control `@for (prod of productos(); track prod.id)` para reconciliación eficiente del DOM sin repintados completos (*DOM Patching*).

3. **RA 3 - CE 3.e (Pruebas y Validación de Componentes):**
   * Archivo de pruebas unitarias exhaustivas: [`carrito-signals.component.spec.ts`](file:///C:/Users/nyanj/.gemini/antigravity/scratch/carrito-signals/src/app/components/carrito-signals/carrito-signals.component.spec.ts).
   * Valida instanciación, cálculo reactivo síncrono, mutaciones inmutables, renderizado de estado vacío (`@empty`) y disparo de efectos.

---

## Ejecución del Proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm start
# o
npx ng serve
```
Abre tu navegador en `http://localhost:4200/`.

### 3. Ejecutar la batería de pruebas unitarias
```bash
npm test
```
