# 📖 Guía de Configuración e Implementación del Bot de WhatsApp

Esta guía te guiará paso a paso para desplegar, duplicar y configurar este bot de WhatsApp con Inteligencia Artificial (Google Gemini) para cualquier tipo de negocio.

---

## 📂 Estructura del Proyecto

El proyecto está diseñado bajo una arquitectura modular y limpia (capas/MVC) para facilitar su mantenimiento y duplicación:

```
BotTemplate/
├── config/
│   ├── bot.config.js       # Configuración central del negocio (Horarios, identidad, placeholders)
│   ├── hooks.js            # Lógicas personalizadas (alertas de pedidos al administrador, etc.)
│   └── skills/
│       ├── open.md         # Prompt de la IA en horario abierto (usa placeholders {{VAR}})
│       └── closed.md        # Prompt de la IA en horario cerrado (usa placeholders {{VAR}})
├── src/
│   ├── server.js           # Punto de entrada de la aplicación Express
│   ├── app.js              # Configuración global del servidor Express (seguridad y ruteo)
│   ├── middleware/
│   │   ├── security.js     # Middlewares de seguridad (CORS, cabeceras)
│   │   └── validation.js   # Validador de payloads entrantes del webhook
│   ├── routes/
│   │   ├── webhook.js      # Endpoint principal del webhook (Meta / Kapso)
│   │   └── payments.js     # Endpoint para recepción de notificaciones de pago
│   ├── services/
│   │   ├── ai.service.js   # Integración oficial con la API de Google Gemini
│   │   ├── schedule.service.js # Verificador de horarios, festivos y reemplazo de placeholders
│   │   └── whatsapp.service.js # Proveedor híbrido de mensajería (Meta WhatsApp Cloud API / Kapso)
│   └── utils/
│       ├── buffer.js       # Acumulador inteligente de mensajes (evita respuestas dobles)
│       ├── history.js      # Gestor de historial de conversación en memoria
│       └── logger.js       # Sistema de logs formateados
├── .env.example            # Ejemplo de variables de entorno requeridas
├── package.json            # Scripts de ejecución y dependencias del proyecto
└── README.md               # Resumen de inicio rápido
```

---

## ⚙️ Pasos para Duplicar y Configurar para un Nuevo Negocio

### Paso 1: Duplicar la Plantilla
1. Copia toda la carpeta del proyecto `BotTemplate/` y renómbrala con el nombre de tu nuevo negocio (ej. `BotMiNegocio/`).
2. Abre la nueva carpeta en tu editor de código preferido (ej. VS Code).

### Paso 2: Configurar las Variables de Entorno
1. Duplica el archivo `.env.example` y llámalo `.env`.
2. Llena las variables correspondientes a tu integración:
   - `PORT`: Puerto donde se ejecuta el bot (por defecto `3000`).
   - `GEMINI_API_KEY`: Tu clave de API de Google AI Studio.
   - `KAPSO_API_KEY`: Tu clave de API oficial de Kapso (si usas Kapso).
   - `DEFAULT_PHONE_NUMBER_ID`: El ID de tu número de teléfono de WhatsApp (Meta / Kapso).
   - `META_VERIFY_TOKEN`: Un token secreto de tu elección para validar el webhook con Meta (ej: `minegocio_token_secreto`).
   - `META_ACCESS_TOKEN`: Token de acceso permanente de Meta (solo si no usas Kapso).
   - `ADMIN_NUMBER`: Número del administrador que recibirá alertas de leads calificados.

### Paso 3: Configurar con tu asistente de IA (Opcional)
Puedes utilizar un asistente de IA (como Claude, Gemini o ChatGPT) para redactar y estructurar la información del catálogo, políticas y horarios, y pedirle que te genere el objeto de configuración exacto para pegar en `config/bot.config.js`.

### Paso 4: Ajustes Finos en `config/bot.config.js`
Si deseas realizar cambios manuales, puedes abrir `config/bot.config.js` directamente:
- **Identidad:** Define el nombre, emoji y teléfono del negocio.
- **Horarios:** Especifica los límites de apertura en formato decimal de 24 horas (ej. `18.5` representa las 6:30 PM). Pon `null` en los días que el negocio permanezca cerrado.
- **Festivos:** Lista los días feriados del año en formato `YYYY-MM-DD` para que el bot responda de manera automatizada como cerrado esos días.
- **Placeholders:** Actualiza las descripciones, catálogo, métodos de pago y políticas. Estos textos se inyectarán de forma dinámica en los archivos markdown sin alterar los prompts base.

---

## ⏱️ Sistema de Horarios y Validación de Festivos

La lógica se encuentra centralizada en `src/services/schedule.service.js`.
1. **Verificación de Zona Horaria:** Utiliza `toLocaleString("en-US", { timeZone: config.timezone })` para evaluar la hora exacta del negocio sin importar dónde esté alojado el servidor.
2. **Validación de Días Festivos:** Antes de consultar el horario del día de la semana, el bot valida si la fecha actual coincide con alguna de las listadas en `holidays`. Si coincide, se le considera cerrado.
3. **Cálculo de Próxima Apertura:** Cuando el bot está cerrado (fuera de horario o en día festivo), calcula automáticamente el siguiente día y hora de atención y responde al cliente utilizando el prompt `closed.md`, informándole exactamente cuándo estará disponible.

---

## 📝 Sistema de Notificación y Seguimiento de Leads (ESTADOS)

El bot clasifica invisiblemente al cliente al final de cada interacción. Los archivos de prompts (`config/skills/open.md` y `config/skills/closed.md`) exigen a la IA añadir una etiqueta oculta de clasificación en la última línea:
- `<!-- ESTADO: interesado -->`: Consultas generales o información de catálogo.
- `<!-- ESTADO: pensando -->`: Promesas de escribir más tarde.
- `<!-- ESTADO: compra -->`: Cliente que confirma tallas, solicita cuentas de pago o envía datos de envío.

### Reenvío al Administrador (Forwarding):
El webhook lee esta clasificación y, junto a los marcadores configurados en `forwarding` de `bot.config.js` (como detectar `*Total:*` en la respuesta y validar con `config/hooks.js`), determina si el cliente completó su proceso de compra para notificar de inmediato al administrador con un resumen del pedido.

---

## 🚀 Despliegue Local y en Producción

### Ejecutar Localmente:
1. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
2. Ejecuta el servidor en modo desarrollo (se reinicia automáticamente ante cambios):
   ```bash
   npm run dev
   ```

### Crear un túnel para pruebas (Webhook):
Dado que Meta o Kapso requieren un endpoint HTTPS público, puedes crear un túnel local usando localtunnel (incluido en los scripts):
```bash
npm run tunnel
```
Esto te dará una URL HTTPS como `https://agente-saboratto-gemi.locallt.me/webhook` que podrás registrar en Kapso o Meta Developer Portal.

### Producción con PM2:
Para mantener el bot corriendo de forma persistente en un servidor VPS o en la nube:
```bash
# Iniciar el bot con PM2
npm run pm2:start

# Ver el estado del proceso
npm run pm2:status

# Ver los logs en tiempo real
npm run pm2:logs
```