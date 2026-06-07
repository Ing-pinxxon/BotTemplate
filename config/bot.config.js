// ============================================================
// CONFIGURACIÓN DEL NEGOCIO (GENÉRICA)
// Este archivo centraliza la configuración de identidad, horarios,
// métodos de pago y placeholders dinámicos para los skills.
// ============================================================

export default {
    // ── Identidad del Negocio ──
    name: "Tu Negocio",
    emoji: "🛍️",
    contactNumber: "1234567890",

    // ── Zona Horaria ──
    timezone: "America/Bogota",

    // ── Comportamiento del Bot ──
    debounceMs: 10000,      // Tiempo de espera para acumular mensajes (ms)
    maxHistory: 60,          // Máximo de mensajes en el historial (30 pares)

    // ── Horarios de Atención (Decimal 24h) ──
    // Formato: [horaApertura, horaCierre] o null = cerrado
    schedule: {
        sunday:    null,
        monday:    [9, 18],     // 9:00 AM - 6:00 PM
        tuesday:   [9, 18],
        wednesday: [9, 18],
        thursday:  [9, 18],
        friday:    [9, 18],
        saturday:  [9, 14],     // 9:00 AM - 2:00 PM
    },

    // ── Listado de Días Festivos (Formato YYYY-MM-DD) ──
    holidays: [
        "2026-01-01", "2026-01-12", "2026-03-23", "2026-04-02", "2026-04-03",
        "2026-05-01", "2026-05-18", "2026-06-08", "2026-06-15", "2026-06-29",
        "2026-07-20", "2026-08-07", "2026-08-17", "2026-10-12", "2026-11-02",
        "2026-11-16", "2026-12-08", "2026-12-25"
    ],

    // ── Datos de Pago ──
    payment: {
        methods: ["Nequi", "Daviplata", "Transferencia Bancaria"],
        key: "1234567890",
        holder: "Nombre del Titular",
    },

    // ── Números de Notificación ──
    notifications: {
        forwarding: process.env.FORWARDING_NUMBER || null, // Número para reenviar confirmaciones
        payments: process.env.BOLD_NOTIFY_NUMBER || null,  // Número para recibir avisos de pago
    },

    // ── Detección de confirmación para reenvío ──
    // El bot reenvía al número de forwarding cuando la respuesta
    // de la IA contiene TODOS estos marcadores:
    forwarding: {
        detectMarkers: ["*Total:*"],  // Marcadores en la respuesta de IA
        ignorePatterns: [               // Si el mensaje del cliente tiene esto, NO reenviar
            /gracias/i, /ok/i, /listo/i, /perfecto/i, /👍/, /si/i, /confirmado/i,
        ],
    },

    // ── Placeholders dinámicos para los Prompts ──
    // Estos valores se inyectarán automáticamente en los archivos open.md y closed.md
    placeholders: {
        BUSINESS_NAME: "Tu Negocio",
        DESCRIPTION: "Somos una tienda de moda online dedicada a ofrecer las mejores prendas importadas.",
        CATALOG: `• Camisetas Cuello Redondo - Tallas: S, M, L, XL - Price: $60.000
• Camisetas Polo - Tallas: S, M, L, XL - Price: $65.000
• Drill Pantalón - Tallas: 28, 30, 32, 34 - Price: $90.000`,
        PAYMENT_DETAILS: `Aceptamos Nequi, Daviplata y transferencia bancaria.
Una vez confirmes tu pedido, te daremos los datos de pago.`,
        POLICIES: `• Cambios válidos dentro de los 3 días hábiles posteriores a la entrega.
• Las prendas deben estar en perfecto estado y con etiquetas.`,
        BUSINESS_HOURS_TEXT: "Lunes a Viernes de 9:00 AM a 6:00 PM. Sábados de 9:00 AM a 2:00 PM. Domingos y festivos cerrado.",
        CONTACT_NUMBER: "1234567890"
    }
};