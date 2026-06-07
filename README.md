# 🤖 BotTemplate — Bot de WhatsApp con IA Multinegocio

Este es un framework para crear bots de WhatsApp con Inteligencia Artificial (Google Gemini 1.5/3.5) altamente configurables, diseñado para poder duplicarse y desplegarse en múltiples negocios de forma sencilla y automatizada.

El bot soporta de forma nativa horarios comerciales, detección de días festivos, seguimiento de leads (interesados, pensando, compra) y notificaciones en tiempo real al administrador.

---

## 🚀 Cómo crear un bot para tu propio negocio en 5 minutos

Hemos desarrollado un flujo automatizado para que no tengas que escribir código al configurar tu negocio:

1. **Llena el cuestionario:** Abre el archivo [CUESTIONARIO.md](file:///c:/Users/Daniel/OneDrive/Documentos/BotTemplate/CUESTIONARIO.md) y responde las preguntas sobre tu negocio (identidad, productos/servicios, horarios, etc.).
2. **Genera la configuración con IA:** Abre el archivo [PROMPT_GENERADOR.md](file:///c:/Users/Daniel/OneDrive/Documentos/BotTemplate/PROMPT_GENERADOR.md), copia su contenido y pégalo en tu asistente de IA favorito (Gemini, ChatGPT, etc.) junto con tu cuestionario completado.
3. **Guarda la configuración:** Copia el código que te genere la IA y reemplaza el contenido de `config/bot.config.js` con él.
4. **¡Listo para arrancar!** Lee la [Guía de Configuración](file:///c:/Users/Daniel/OneDrive/Documentos/BotTemplate/config_guide.md) para los pasos de despliegue local o producción.

---

## 🛠️ Características Principales

- **Arquitectura en Capas (Modular):** Separación limpia entre rutas, servicios de IA, lógica de horarios y utilidades.
- **Inyección Dinámica de Prompts:** Los prompts del bot se encuentran redactados en markdown (`config/skills/open.md` y `config/skills/closed.md`) y consumen placeholders dinámicos de `bot.config.js` (como `{{BUSINESS_NAME}}`, `{{CATALOG}}`, etc.).
- **Gestión Inteligente de Horarios:** Verifica si el negocio está abierto según la zona horaria del negocio y responde en consecuencia. Si está cerrado, le indica amablemente al cliente cuándo abrirá.
- **Validación de Días Festivos:** Ignora el horario habitual en días feriados configurados para marcar el negocio como cerrado.
- **Clasificación de Leads Invisible:** El bot califica de manera oculta e invisible a los clientes en cada mensaje (`interesado`, `pensando`, `compra`) para que puedas analizar tus oportunidades comerciales.
- **Notificaciones al Administrador:** Envía resúmenes de pedidos completados directamente al WhatsApp del administrador o del equipo de cocina/despachos en tiempo real.
- **Soporte de Pago Webhook:** Un endpoint dedicado (`POST /notify-payment`) listo para conectarse con Bold, Zapier o pasarelas de pago y notificar pagos recibidos automáticamente.
- **Soporte Híbrido Meta Cloud API & Kapso:** Envía mensajes usando la API oficial de WhatsApp Cloud o a través de Kapso (tanto API Meta Proxy como Legacy API).

---

## 📁 Estructura del Repositorio

Para conocer a detalle qué hace cada archivo del proyecto, consulta la [Guía de Configuración (config_guide.md)](file:///c:/Users/Daniel/OneDrive/Documentos/BotTemplate/config_guide.md).

---

## 💻 Requisitos Previos

- [Node.js](https://nodejs.org/) (Versión 18 o superior)
- Una API Key de Google Gemini (puedes obtenerla gratis en [Google AI Studio](https://aistudio.google.com/))
- Una cuenta en Kapso o Meta Developer Portal.

---

## 🤝 Contribuciones

Si deseas mejorar la estructura o agregar soporte para más pasarelas de pago, no dudes en enviar un Pull Request.

---

Desarrollado para facilitar la automatización de ventas de pequeños y medianos negocios. 🚀