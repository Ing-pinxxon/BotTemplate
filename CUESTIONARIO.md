# 📋 Cuestionario de Configuración — Bot de WhatsApp con IA

> Completa cada sección con la información de tu negocio.
> Una vez lleno, entrégaselo a la IA junto con las instrucciones del archivo `PROMPT_GENERADOR.md` para que genere automáticamente la configuración de tu bot.

---

## 1. IDENTIDAD DEL NEGOCIO

- **Nombre del negocio:**
  _Ejemplo: Camicas_

- **Descripción corta (1-2 líneas):**
  _Ejemplo: Ropa importada masculina, venta online. Envíos a nivel nacional._

- **Emoji representativo del negocio:**
  _Ejemplo: 👕 para ropa, 🍔 para comida, 💅 para belleza, 🛒 para tienda general_

- **Número de contacto/soporte (WhatsApp):**
  _Ejemplo: 3123625567_

---

## 2. CATÁLOGO DE PRODUCTOS O SERVICIOS

> Lista todos tus productos o servicios con sus precios.
> Si manejas tallas, tamaños, sabores u otras variaciones, inclúyelas.

| Producto / Servicio | Variaciones (talla, tamaño, etc.) | Precio |
|---|---|---|
| _Ejemplo: Camiseta cuello redondo_ | _S, M, L, XL, XXL_ | _$60.000_ |
| _Ejemplo: Camiseta tipo polo_ | _S, M, L, XL, XXL_ | _$60.000_ |
| _Ejemplo: Drill_ | _S, M, L, XL, XXL_ | _$70.000_ |
| | | |
| | | |
| | | |
| | | |
| | | |

---

## 3. MÉTODOS DE PAGO

> Indica todos los métodos de pago que aceptas.

- **Métodos aceptados:**
  _Ejemplo: Nequi, Daviplata, Contraentrega, Transferencia bancaria_

- **Datos de la cuenta para transferencias (opcional, si deseas que el bot los comparta):**
  - Plataforma (Nequi/Daviplata/Bancolombia/etc.):
  - Número o llave:
  - Nombre del titular:

---

## 4. ENVÍOS Y ENTREGAS

- **¿Realizas envíos?** (Sí / No):

- **Cobertura de envíos:**
  _Ejemplo: A nivel nacional / Solo Bogotá / Solo zona urbana_

- **Costo de envío:**
  _Ejemplo: Depende del peso / $8.000 tarifa fija / Gratis por compras mayores a $100.000_

- **Tiempo estimado de entrega:**
  _Ejemplo: De 2 a 5 días hábiles / 45 minutos a 1 hora_

---

## 5. POLÍTICAS DEL NEGOCIO

- **Política de cambios y devoluciones:**
  _Ejemplo: Se aceptan cambios dentro de los 3 días siguientes. No se aceptan devoluciones en prendas usadas._

- **¿Manejas stock limitado?** (Sí / No):

- **Otras políticas importantes:**
  _Ejemplo: Los pedidos se procesan en orden de llegada. Reservamos el producto por 24 horas después de confirmar._

---

## 6. HORARIO DE ATENCIÓN

> Indica los días y horas en que el bot debe tomar pedidos activamente.
> Fuera de este horario, el bot seguirá respondiendo preguntas pero no procesará ventas.

| Día | ¿Abierto? | Hora de apertura | Hora de cierre |
|---|---|---|---|
| Lunes | _Sí / No_ | _Ej: 9:00 AM_ | _Ej: 6:00 PM_ |
| Martes | _Sí / No_ | | |
| Miércoles | _Sí / No_ | | |
| Jueves | _Sí / No_ | | |
| Viernes | _Sí / No_ | | |
| Sábado | _Sí / No_ | | |
| Domingo | _Sí / No_ | | |

- **Zona horaria:**
  _Ejemplo: America/Bogota_

---

## 7. DÍAS FESTIVOS (OPCIONAL)

> Si deseas que el bot se marque como cerrado en días festivos, lista las fechas del año actual en formato AAAA-MM-DD.

_Ejemplo para Colombia 2026:_
```
2026-01-01, 2026-01-12, 2026-03-23, 2026-04-02, 2026-04-03,
2026-05-01, 2026-05-18, 2026-06-08, 2026-06-15, 2026-06-29,
2026-07-20, 2026-08-07, 2026-08-17, 2026-10-12, 2026-11-02,
2026-11-16, 2026-12-08, 2026-12-25
```

---

## 8. TONO Y PERSONALIDAD DEL BOT

- **¿Cómo debería hablar el bot?**
  _Ejemplo: Cercano y profesional / Formal y serio / Casual y juvenil_

- **¿Debe usar emojis?** (Sí, moderado / Sí, mucho / No):

- **¿Hay palabras o expresiones que NO debe usar?**
  _Ejemplo: No usar diminutivos como "camisita" o "ropita"_

- **¿Hay una frase de cierre especial que quieras?**
  _Ejemplo: "¡Gracias por elegirnos! 🙌"_

---

## 9. REGLAS ESPECIALES DEL NEGOCIO (OPCIONAL)

> Escribe aquí cualquier regla particular que el bot deba seguir al interactuar con los clientes.

_Ejemplos:_
- _"Siempre confirmar talla y color antes de dar el total."_
- _"Si piden domicilio, siempre cobrar $2.000 extra."_
- _"No ofrecer descuentos a menos que el cliente pregunte."_
- _"Si el cliente reporta un problema, redirigir al número de soporte."_

```
1.
2.
3.
4.
5.
```

---

## 10. NOTIFICACIONES AL ADMINISTRADOR

- **¿Deseas recibir alertas de seguimiento de clientes en tu WhatsApp?** (Sí / No):

- **Número de WhatsApp del administrador (con indicativo de país, sin '+'):**
  _Ejemplo: 573123625567_

- **¿Deseas recibir notificaciones de pagos confirmados?** (Sí / No):

---

## 11. FORMATO DE RESUMEN DE PEDIDO (OPCIONAL)

> Si deseas personalizar cómo se ve el resumen que el bot le muestra al cliente antes de confirmar, escríbelo aquí. Si no, se usará el formato predeterminado.

_Formato predeterminado:_
```
Listo ✅ te confirmo tu pedido:

• [Cantidad] [Producto] – [Especificación] – $[precio]

Subtotal: $[monto]
Envío: $[monto]
*Total: $[monto]*

Método de pago: [opciones]
¿Confirmamos? 🙌
```

_Tu formato personalizado (si deseas cambiarlo):_
```


```

---

> **¡Listo!** Una vez completes este cuestionario, cópialo y pégalo junto con las instrucciones del archivo `PROMPT_GENERADOR.md` en tu asistente de IA favorito para generar automáticamente la configuración de tu bot.
