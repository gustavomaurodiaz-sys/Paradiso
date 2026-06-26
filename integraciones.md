# Integraciones necesarias

El proyecto mantiene dos paginas principales:

- `index.html`: pagina publica para clientas.
- `gestion.html`: panel privado para administrar servicios, reservas, cobro, calendario y SMTP.

## Flujo publico actual

La pagina publica no usa carrito ni Mercado Pago Checkout. El flujo es:

1. La clienta selecciona uno o varios servicios con tarjetas marcables.
2. El sistema calcula precio total y tiempo total.
3. Al continuar, se abre un modal para elegir fecha y horario disponible.
4. Los horarios se calculan entre 08:00 y 19:00.
5. El sistema bloquea turnos ya reservados y valida solapamientos.
6. Al elegir horario, se abre un segundo modal con resumen y datos de transferencia.
7. La clienta carga sus datos y adjunta comprobante JPG, JPEG, PNG o PDF.
8. Al generar la reserva, queda como `Pendiente de validacion de pago` y el horario queda reservado provisoriamente.

## Configuracion de cobro

`gestion.html` incluye la seccion `Configuracion de Cobro` con:

- Alias de Mercado Pago.
- Nombre del titular.
- CBU opcional.
- Mensaje personalizado de pago.

Valores iniciales:

- Alias: `laura.dba`
- Titular: `Laura Paradiso`

La pagina publica lee siempre estos datos desde `localStorage`, sin modificar codigo.

## Bloqueo de turnos

Cada reserva guarda:

- Fecha.
- Horario de inicio.
- Horario estimado de finalizacion.
- Duracion total.
- Servicios seleccionados.
- Estado del pago.
- Estado del turno.
- Comprobante adjunto.

Bloquean disponibilidad las reservas con estado:

- `Pendiente de validacion de pago`.
- `Reserva confirmada`.

No bloquean disponibilidad:

- `Pago rechazado`.
- `Cancelada`.

El sistema evita reservas que empiecen, terminen o cubran un turno ya ocupado.

## Gestion

`gestion.html` permite:

- Crear, editar, activar, desactivar y eliminar servicios.
- Configurar datos de cobro.
- Ver reservas recibidas.
- Ver notificacion visual de reservas nuevas.
- Ver comprobante cargado.
- Descargar comprobante.
- Aprobar pago.
- Rechazar pago.
- Liberar horario.
- Ver alerta cuando una reserva provisional supera 24 horas sin aprobacion.
- Ver calendario mensual con dias ocupados.
- Ver horarios ocupados y disponibles por fecha.
- Configurar SMTP y enviar una prueba real al correo administrador.

Credenciales iniciales:

- Usuario: `admin`
- Contrasena: `paradiso2026`

Importante: al ser una web estatica, esta proteccion es solo una barrera visual del lado del navegador. Para seguridad real, el panel debe estar protegido por backend.

## SMTP

El navegador usa el backend Node.js local incluido en `server-local.js` para enviar correos reales con Nodemailer cuando se prueba en la computadora.

La configuracion SMTP permite probar el envio al correo administrador y enviar consejos de cuidado a la clienta desde el panel, sin abrir clientes externos de correo. Para Gmail usar `smtp.gmail.com`, puerto `587`, seguridad STARTTLS / SSL-TLS activada y una contrasena de aplicacion de Google.

Cuando se genere una reserva, el backend deberia enviar al administrador:

- Nombre del cliente.
- Telefono.
- Correo electronico.
- Servicios seleccionados.
- Total.
- Duracion.
- Fecha del turno.
- Horario de inicio y finalizacion.
- Alias utilizado.
- Comprobante adjunto.
- Estado: pendiente de validacion de pago.

## Nota tecnica

Los comprobantes se guardan en `localStorage` como datos embebidos para esta version estatica. Para produccion conviene mover reservas y archivos a un backend/base de datos con almacenamiento de archivos.
