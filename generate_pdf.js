const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CAPTURAS_DIR = path.join(__dirname, 'capturas');
const OUTPUT_HTML = path.join(__dirname, 'Memoria_Entrega_Angular_Signals_DAM.html');
const OUTPUT_PDF = path.join(__dirname, 'Entrega_Practica_Angular_Signals_DAM.pdf');
const ARTIFACT_PDF = 'C:\\\\Users\\\\nyanj\\\\.gemini\\\\antigravity\\\\brain\\\\8a0a1740-62f9-4cdc-91cf-49833fa70f8d\\\\Entrega_Practica_Angular_Signals_DAM.pdf';

function toBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileData.toString('base64')}`;
}

const img1 = toBase64(path.join(CAPTURAS_DIR, 'captura1_renderizado_inicial.png'));
const img2 = toBase64(path.join(CAPTURAS_DIR, 'captura2_producto_anadido.png'));
const img3 = toBase64(path.join(CAPTURAS_DIR, 'captura3_consola_items.png'));
const img4 = toBase64(path.join(CAPTURAS_DIR, 'captura4_total_precio.png'));

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Memoria de Entrega - Angular Signals | DAM 0488</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 14mm 12mm 14mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #ffffff;
      line-height: 1.45;
      font-size: 12px;
      margin: 0;
      padding: 0;
    }
    .page {
      page-break-after: always;
      height: 273mm;
      max-height: 273mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .content-area {
      flex: 1;
    }
    .header-box {
      border-left: 5px solid #2563eb;
      padding: 12px 18px;
      background: #f8fafc;
      border-radius: 0 8px 8px 0;
      margin-bottom: 14px;
    }
    h1 {
      color: #1e3a8a;
      font-size: 22px;
      margin: 0 0 4px 0;
      font-weight: 800;
    }
    h2 {
      color: #1e40af;
      font-size: 16px;
      margin: 14px 0 8px 0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
    }
    h3 {
      color: #1f2937;
      font-size: 13px;
      margin: 10px 0 4px 0;
      font-weight: 700;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 8px;
      font-size: 11.5px;
    }
    .meta-item {
      background: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .meta-item strong {
      color: #2563eb;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 11px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background: #eff6ff;
      color: #1e40af;
      font-weight: 700;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    code {
      font-family: 'Consolas', monospace;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 11px;
    }
    .img-container {
      text-align: center;
      margin: 6px 0;
    }
    .device-mockup {
      display: inline-block;
      border: 3px solid #334155;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      background: #ffffff;
    }
    .device-mockup img {
      display: block;
      height: 345px;
      width: auto;
    }
    .console-mockup {
      width: 100%;
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      border-radius: 6px;
      overflow: hidden;
      margin: 6px 0;
    }
    .console-mockup img {
      width: 100%;
      display: block;
      max-height: 180px;
      object-fit: contain;
      background: #1e1e1e;
    }
    .badge-test-success {
      display: inline-block;
      background: #16a34a;
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 9999px;
      font-weight: bold;
      font-size: 11px;
    }
    .callout {
      background: #eff6ff;
      border-left: 3px solid #3b82f6;
      padding: 8px 10px;
      border-radius: 0 4px 4px 0;
      margin: 6px 0;
      font-size: 11px;
    }
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: start;
    }
    .footer-note {
      text-align: center;
      font-size: 10.5px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      margin-top: 8px;
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA Y ALINEACIÓN CURRICULAR -->
  <div class="page">
    <div class="content-area">
      <div class="header-box">
        <h1>Dossier de Práctica y Evidencias de Pantalla</h1>
        <div style="font-size: 15px; color: #4b5563; font-weight: 600;">
          Evolución Arquitectónica y Reactividad con Angular Signals
        </div>
        <div class="meta-grid">
          <div class="meta-item"><strong>Módulo:</strong> Desarrollo de Interfaces (0488)</div>
          <div class="meta-item"><strong>Ciclo:</strong> DAM (Grado Superior)</div>
          <div class="meta-item"><strong>Marco Curricular:</strong> Comunidad de Madrid</div>
          <div class="meta-item"><strong>Tecnologías:</strong> Angular Standalone, Ionic, Signals, Zoneless</div>
        </div>
      </div>

      <h2>1. Alineación Curricular y Criterios Evaluados</h2>
      <p style="margin: 4px 0;">Esta entrega técnica da cumplimiento estricto a las competencias descritas en el currículo oficial:</p>

      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Resultado de Aprendizaje</th>
            <th style="width: 28%;">Criterio de Evaluación</th>
            <th>Evidencia Demostrada en la Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>RA 1:</strong> Confecciona interfaces aplicando arquitecturas y patrones.</td>
            <td><strong>CE 1.a:</strong> Se han identificado arquitecturas de diseño de UI.</td>
            <td>Diferenciación conceptual y práctica entre Zone.js (Dirty Checking descendente) vs Signals (Zoneless).</td>
          </tr>
          <tr>
            <td><strong>RA 1:</strong> Confecciona interfaces aplicando arquitecturas y patrones.</td>
            <td><strong>CE 1.b:</strong> Se han evaluado los patrones de diseño de UI.</td>
            <td>Patrón Productor-Consumidor (Grafo reactivo), inmutabilidad en <code>.update()</code> y memoización en <code>computed()</code>.</td>
          </tr>
          <tr>
            <td><strong>RA 3:</strong> Crea componentes visuales, eventos y controles.</td>
            <td><strong>CE 3.d:</strong> Se han asociado acciones a los eventos.</td>
            <td>Manejadores <code>(click)</code> vinculados a mutaciones de estado y reconciliación eficiente con <code>@for (track)</code>.</td>
          </tr>
          <tr>
            <td><strong>RA 3:</strong> Crea componentes visuales, eventos y controles.</td>
            <td><strong>CE 3.e:</strong> Se han probado y validado los componentes creados.</td>
            <td>Batería de pruebas unitarias con Jasmine y TestBed Zoneless (6 specs ejecutadas con 100% SUCCESS).</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Justificación Técnica: De Zone.js a Angular Signals</h2>
      <div class="card">
        <h3 style="margin-top:0;">El problema histórico de Zone.js (Angular &le; 15)</h3>
        <p style="margin: 4px 0;">Tradicionalmente, Angular dependía de <code>Zone.js</code> para interceptar eventos asíncronos y recorrer de arriba a abajo todo el árbol de componentes (<em>Dirty Checking</em>). En aplicaciones móviles con <strong>Ionic / Capacitor</strong>, esto causaba sobrecostes críticos de CPU, latencia de renderizado y consumo prematuro de batería.</p>
        
        <h3 style="margin-top: 8px;">El nuevo paradigma reactivo granular (Signals & Zoneless)</h3>
        <p style="margin: 4px 0;">Las <strong>Signals</strong> sustituyen el chequeo global por un <strong>Grafo de Dependencias</strong>. Cada nodo del DOM se enlaza directamente a su señal productora. Cuando el estado cambia, únicamente el fragmento del DOM afectado es actualizado quirúrgicamente (<em>fine-grained reactivity</em>), logrando un entorno 100% <strong>Zoneless</strong> sin sobrecargas de rendimiento.</p>
      </div>
    </div>

    <div class="footer-note">
      Módulo de Desarrollo de Interfaces (0488) | CFGS DAM | Página 1 de 4
    </div>
  </div>

  <!-- PÁGINA 2: EVIDENCIAS 1 Y 2 (RENDERIZADOS) -->
  <div class="page">
    <div class="content-area">
      <h2>3. Evidencias de Funcionamiento: Renderizado en Pantalla</h2>
      
      <div class="grid-2col">
        <!-- CAPTURA 1 -->
        <div>
          <div class="card" style="margin-bottom: 4px; padding: 6px 10px;">
            <h3 style="margin: 0; color: #1e40af; font-size: 12px;">Captura 1 : Renderizado Inicial</h3>
            <p style="margin: 2px 0 0 0; font-size: 10.5px; color: #64748b;">Estado inicial al montarse el componente</p>
          </div>
          <div class="img-container">
            <div class="device-mockup">
              <img src="${img1}" alt="Captura 1: Renderizado Inicial">
            </div>
          </div>
          <div class="callout">
            <strong>Análisis Técnico:</strong>
            <ul style="margin: 2px 0 0 -16px; padding: 0;">
              <li><strong>WritableSignal:</strong> Inicializada con 2 productos (<em>Licencia IDE 89€</em> y <em>Teclado Mecánico 120€</em>).</li>
              <li><strong>Computed Signal:</strong> <code>precioTotal()</code> calcula síncronamente <strong>209€</strong> en el badge del toolbar superior.</li>
              <li><strong>OnPush:</strong> Renderizado estricto sin comprobación global.</li>
            </ul>
          </div>
        </div>

        <!-- CAPTURA 2 -->
        <div>
          <div class="card" style="margin-bottom: 4px; padding: 6px 10px;">
            <h3 style="margin: 0; color: #1e40af; font-size: 12px;">Captura 2 : Renderizado con Producto Añadido</h3>
            <p style="margin: 2px 0 0 0; font-size: 10.5px; color: #64748b;">Estado tras pulsar "Añadir Producto Random"</p>
          </div>
          <div class="img-container">
            <div class="device-mockup">
              <img src="${img2}" alt="Captura 2: Producto Añadido">
            </div>
          </div>
          <div class="callout">
            <strong>Análisis Técnico:</strong>
            <ul style="margin: 2px 0 0 -16px; padding: 0;">
              <li><strong>Mutación inmutable:</strong> Se ejecuta <code>.update(prev => [...prev, nuevo])</code> generando nueva referencia en memoria.</li>
              <li><strong>DOM Patching (@for):</strong> <code>track prod.id</code> inserta quirúrgicamente el nuevo nodo (<em>Monitor 879</em>) sin repintar la lista.</li>
              <li><strong>Reactividad síncrona:</strong> Vista actualizada al instante.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      Módulo de Desarrollo de Interfaces (0488) | CFGS DAM | Página 2 de 4
    </div>
  </div>

  <!-- PÁGINA 3: EVIDENCIAS 3 Y 4 (CONSOLA Y TOTAL PRECIO) -->
  <div class="page">
    <div class="content-area">
      <h2>4. Evidencias de Funcionamiento: Consola y Recálculo de Precio</h2>

      <!-- CAPTURA 3 -->
      <div style="margin-bottom: 12px;">
        <div class="card" style="margin-bottom: 4px; padding: 6px 10px;">
          <h3 style="margin: 0; color: #1e40af; font-size: 12.5px;">Captura 3 : Vista Consola con Total Items (Efecto Secundario)</h3>
          <p style="margin: 2px 0 0 0; font-size: 10.5px; color: #64748b;">Traza de ejecución automática del hook <code>effect()</code></p>
        </div>
        <div class="console-mockup">
          <img src="${img3}" alt="Captura 3: Consola DevTools">
        </div>
        <div class="callout">
          <strong>Fundamento Arquitectónico de <code>effect()</code>:</strong>
          Al declararse en el constructor (<em>Injection Context</em>), Angular vincula su ciclo de vida al del componente. La primera línea registra la inicialización (<code>Items: 2</code>). Tras pulsar añadir producto, el efecto detecta la nueva referencia emitida por la WritableSignal y ejecuta la persistencia (<code>Items: 3</code>) de forma segura y sin memory leaks.
        </div>
      </div>

      <!-- CAPTURA 4 -->
      <div>
        <div class="card" style="margin-bottom: 4px; padding: 6px 10px;">
          <h3 style="margin: 0; color: #1e40af; font-size: 12.5px;">Captura 4 : Renderizado de Total Precio con Producto Añadido</h3>
          <p style="margin: 2px 0 0 0; font-size: 10.5px; color: #64748b;">Validación de la señal computada con evaluación perezosa y memoizada</p>
        </div>
        
        <div class="grid-2col" style="align-items: center;">
          <div class="img-container">
            <div class="device-mockup">
              <img src="${img4}" alt="Captura 4: Total Precio Recalculado" style="height: 290px;">
            </div>
          </div>
          <div>
            <div class="card" style="background: #ffffff; border-left: 4px solid #16a34a; margin-bottom: 8px;">
              <h4 style="margin:0 0 6px 0; color: #16a34a; font-size: 12px;">Recálculo Reactivo de <code>precioTotal()</code></h4>
              <table style="margin: 0; font-size: 10.5px;">
                <tr>
                  <td><strong>Precio anterior:</strong></td>
                  <td>89€ + 120€ = <strong>209€</strong></td>
                </tr>
                <tr>
                  <td><strong>Producto añadido:</strong></td>
                  <td>Monitor (id: 879) = <strong>+250€</strong></td>
                </tr>
                <tr style="background: #f0fdf4;">
                  <td><strong>Nuevo Total:</strong></td>
                  <td><strong style="color: #15803d; font-size: 12px;">Total: 459€</strong></td>
                </tr>
              </table>
            </div>
            <div class="callout">
              <strong>Memoización en <code>computed()</code>:</strong>
              A diferencia de una función tradicional en la plantilla (<code>{{ calcularTotal() }}</code>) que se ejecuta docenas de veces por segundo en cada frame, <code>computed()</code> cachea su resultado y solo reejecuta el bucle <code>reduce()</code> cuando cambia el puntero en memoria del array.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      Módulo de Desarrollo de Interfaces (0488) | CFGS DAM | Página 3 de 4
    </div>
  </div>

  <!-- PÁGINA 4: PRUEBAS UNITARIAS Y CONCLUSIONES -->
  <div class="page">
    <div class="content-area">
      <h2>5. Validación y Pruebas Unitarias Automatizadas (CE 3.e)</h2>
      
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="margin: 0; color: #1e40af; font-size: 13px;">Resultado de la Suite de Pruebas (Karma + Jasmine + TestBed)</h3>
          <span class="badge-test-success">&#10004; 6 de 6 TESTS EN VERDE (SUCCESS)</span>
        </div>
        <p style="margin: 0 0 8px 0; font-size: 11px;">
          Para validar el <strong>Criterio CE 3.e</strong> (*Se han probado y validado los componentes creados*), se implementaron 6 especificaciones automatizadas ejecutadas bajo el entorno de pruebas <strong>Zoneless</strong>:
        </p>

        <table>
          <thead>
            <tr>
              <th style="width: 5%;">#</th>
              <th style="width: 45%;">Descripción del Test Unitario</th>
              <th style="width: 38%;">Mecanismo Validado</th>
              <th style="width: 12%;">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Instanciación correcta del componente</td>
              <td>Inyección de dependencias y TestBed Standalone</td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Inicialización con 2 productos y cálculo de 209€</td>
              <td>Lectura síncrona de <code>signal()</code> y <code>computed()</code></td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Añadir producto con <code>.update()</code> e inmutabilidad</td>
              <td>Nueva referencia en memoria y recálculo a 459€</td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Eliminar producto por id y recálculo reactivo</td>
              <td>Filtrado inmutable y actualización síncrona</td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Comprobación de estado de carrito vacío</td>
              <td>Renderizado del bloque nativo <code>@empty</code></td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Ejecución de <code>effect()</code> al mutar estado</td>
              <td>Disparo del ciclo de detección de cambios Zoneless</td>
              <td style="color: #16a34a; font-weight: bold;">PASSED</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>6. Conclusiones y Resumen de Entrega</h2>
      <div class="card" style="background: #f8fafc;">
        <p style="margin: 0 0 6px 0;">
          El ejercicio práctico demuestra con solvencia la transición arquitectónica hacia el estándar reactivo moderno de Angular:
        </p>
        <ul style="margin: 0 0 0 -16px; padding: 0; line-height: 1.45;">
          <li><strong>Rendimiento Móvil:</strong> Se erradica el sobrecoste de <code>Zone.js</code>, logrando un bundle ligero y actualizaciones quirúrgicas óptimas para dispositivos móviles en Ionic/Capacitor.</li>
          <li><strong>Inmutabilidad y Predictibilidad:</strong> El uso de <code>.update()</code> previene fallos de desincronización de vista habituales con métodos mutables directos como <code>push()</code>.</li>
          <li><strong>Eficiencia Energética y CPU:</strong> La memoización mediante <code>computed()</code> garantiza cero cómputos redundantes en plantillas.</li>
          <li><strong>Seguridad de Memoria:</strong> Los efectos vinculados al ciclo de vida del componente previenen las fugas de memoria típicas de suscripciones RxJS descuidadas.</li>
        </ul>
      </div>
    </div>

    <div class="footer-note">
      Memoria Técnica y Entrega Práctica | Módulo Desarrollo de Interfaces (0488) | Ciclo DAM | Página 4 de 4
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync(OUTPUT_HTML, htmlContent, 'utf-8');
console.log('HTML de entrega generado con éxito:', OUTPUT_HTML);

// Generar el PDF final usando Chrome Headless
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProcess = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${OUTPUT_PDF}`,
  `file://${OUTPUT_HTML.replace(/\\/g, '/')}`
]);

chromeProcess.on('exit', (code) => {
  console.log(`PDF generado con código ${code}: ${OUTPUT_PDF}`);
  if (fs.existsSync(OUTPUT_PDF)) {
    fs.copyFileSync(OUTPUT_PDF, ARTIFACT_PDF);
    console.log(`PDF copiado a la carpeta de artefactos: ${ARTIFACT_PDF}`);
  }
});
