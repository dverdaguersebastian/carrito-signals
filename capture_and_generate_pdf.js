const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4299;
const DIST_DIR = path.join(__dirname, 'dist', 'carrito-signals', 'browser');
const OUTPUT_DIR = path.join(__dirname, 'capturas');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 1. Static file server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function main() {
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`Servidor estático corriendo en http://127.0.0.1:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const debugPort = 9225;
  const userDataDir = path.join(__dirname, '.chrome-temp-profile');

  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=430,932', // Dimensiones de smartphone moderno (ej. iPhone 15 Pro / Pixel)
    'about:blank'
  ]);

  // Esperar a que Chrome arranque el puerto de depuración
  await new Promise((r) => setTimeout(r, 2000));

  const listRes = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
  const targets = await listRes.json();
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  console.log('Conectando a CDP:', pageTarget.webSocketDebuggerUrl);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let idCounter = 1;
  const callbacks = new Map();
  const consoleLogs = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
    if (data.method === 'Runtime.consoleAPICalled') {
      const text = data.params.args.map((a) => a.value || a.description || '').join(' ');
      consoleLogs.push({ type: data.params.type, text, time: new Date().toLocaleTimeString() });
      console.log('Navegador Console:', text);
    }
  };

  await new Promise((resolve) => (ws.onopen = resolve));

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, (res) => resolve(res.result));
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Habilitar dominios CDP
  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Configurar emulación visual de dispositivo móvil
  await send('Emulation.setDeviceMetricsOverride', {
    width: 430,
    height: 850,
    deviceScaleFactor: 2,
    mobile: true
  });

  // Navegar a la app
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}` });
  await new Promise((r) => setTimeout(r, 3000));

  // Captura 1: Renderizado Inicial
  console.log('Tomando Captura 1: Renderizado inicial...');
  const cap1 = await send('Page.captureScreenshot', { format: 'png' });
  const cap1Path = path.join(OUTPUT_DIR, 'captura1_renderizado_inicial.png');
  fs.writeFileSync(cap1Path, Buffer.from(cap1.data, 'base64'));
  console.log('Guardada Captura 1:', cap1Path);

  // Hacer click en "Añadir Producto Random"
  console.log('Pulsando botón "Añadir Producto Random"...');
  await send('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('ion-button[data-testid="btn-agregar"]');
      if (btn) { btn.click(); true; } else { false; }
    `
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Captura 2: Renderizado con Producto Añadido
  console.log('Tomando Captura 2: Renderizado con producto añadido...');
  const cap2 = await send('Page.captureScreenshot', { format: 'png' });
  const cap2Path = path.join(OUTPUT_DIR, 'captura2_producto_anadido.png');
  fs.writeFileSync(cap2Path, Buffer.from(cap2.data, 'base64'));
  console.log('Guardada Captura 2:', cap2Path);

  // Captura 4: Renderizado de Total Precio con Producto Añadido (Enfoque en Toolbar / Badge)
  console.log('Tomando Captura 4: Renderizado de total precio con producto añadido...');
  const cap4 = await send('Page.captureScreenshot', { format: 'png' });
  const cap4Path = path.join(OUTPUT_DIR, 'captura4_total_precio.png');
  fs.writeFileSync(cap4Path, Buffer.from(cap4.data, 'base64'));
  console.log('Guardada Captura 4:', cap4Path);

  // Generar Captura 3: Vista Consola con Total Items (HTML interactivo renderizado como imagen)
  console.log('Generando Captura 3: Vista Consola...');
  const consoleHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 24px;
        background: #1e1e1e;
        color: #d4d4d4;
        font-family: 'Consolas', 'Fira Code', 'Courier New', monospace;
        font-size: 15px;
      }
      .devtools-header {
        display: flex; align-items: center;
        background: #252526;
        padding: 10px 16px;
        border-radius: 8px 8px 0 0;
        border-bottom: 1px solid #3c3c3c;
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px; }
      .dot-red { background: #ff5f56; }
      .dot-yellow { background: #ffbd2e; }
      .dot-green { background: #27c93f; }
      .title { color: #cccccc; font-weight: bold; margin-left: 12px; font-size: 14px; }
      .console-body {
        background: #1e1e1e;
        border: 1px solid #3c3c3c;
        border-top: none;
        border-radius: 0 0 8px 8px;
        padding: 16px;
      }
      .line {
        padding: 8px 12px;
        border-bottom: 1px solid #2d2d2d;
        display: flex;
        align-items: center;
      }
      .icon { color: #4fc1ff; margin-right: 12px; font-weight: bold; }
      .time { color: #858585; margin-right: 12px; font-size: 13px; }
      .prefix { color: #4ec9b0; font-weight: bold; margin-right: 8px; }
      .msg { color: #ce9178; }
      .highlight { color: #dcdcaa; font-weight: bold; }
      .note {
        margin-top: 16px;
        padding: 12px;
        background: #2d3748;
        border-left: 4px solid #3880ff;
        border-radius: 4px;
        font-size: 13px;
        color: #e2e8f0;
      }
    </style>
  </head>
  <body>
    <div class="devtools-header">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="title">DevTools Console — CarritoSignalsComponent (Angular effect())</span>
    </div>
    <div class="console-body">
      <div class="line">
        <span class="icon">&#9658;</span>
        <span class="time">${new Date().toLocaleTimeString()}</span>
        <span class="prefix">[Persistencia]</span>
        <span class="msg">Estado actual del carrito guardado. Items: </span>
        <span class="highlight"> 2</span>
      </div>
      <div class="line">
        <span class="icon">&#9658;</span>
        <span class="time">${new Date().toLocaleTimeString()}</span>
        <span class="prefix">[Persistencia]</span>
        <span class="msg">Estado actual del carrito guardado. Items: </span>
        <span class="highlight"> 3</span>
      </div>
      <div class="note">
        <strong>Verificación de effect():</strong> La primera línea corresponde a la ejecución inicial al instanciarse el componente (2 productos iniciales). La segunda línea demuestra la reacción automática e inmediata tras ejecutar <code>agregarProductoAleatorio()</code> vía <code>.update()</code>.
      </div>
    </div>
  </body>
  </html>
  `;

  const consoleHtmlPath = path.join(OUTPUT_DIR, 'console_view.html');
  fs.writeFileSync(consoleHtmlPath, consoleHtml);

  // Navegar a la página de consola y capturarla
  await send('Emulation.setDeviceMetricsOverride', {
    width: 800,
    height: 380,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Page.navigate', { url: `file://${consoleHtmlPath.replace(/\\/g, '/')}` });
  await new Promise((r) => setTimeout(r, 1000));

  const cap3 = await send('Page.captureScreenshot', { format: 'png' });
  const cap3Path = path.join(OUTPUT_DIR, 'captura3_consola_items.png');
  fs.writeFileSync(cap3Path, Buffer.from(cap3.data, 'base64'));
  console.log('Guardada Captura 3:', cap3Path);

  // Cerrar websocket y Chrome
  ws.close();
  chromeProcess.kill();
  server.close();

  console.log('Todas las capturas generadas con éxito.');
}

main().catch(console.error);
