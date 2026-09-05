# Ventanas de Mantenimiento — Solicitudes

Página pública para registrar solicitudes de ventana de mantenimiento; cada solicitud crea un evento en 5 Google Calendar fijos y queda registrada en un Google Sheet.

## Configuración manual (una sola vez)

1. Crear un Google Sheet nuevo desde `jsolis@gruponxt.com` llamado "Bitácora Ventanas Mantenimiento".
   - Renombrar la primera pestaña a `Solicitudes`.
   - Fila 1 (encabezados, 11 columnas): `ID | Timestamp | Proyecto | Finalidad | Fecha | Hora | Duración (h) | Solicitada por | Acceso | Estatus | EventosJSON`.
   - Copiar el ID del Sheet (de la URL, entre `/d/` y `/edit`).
2. En ese Sheet: **Extensiones → Apps Script**. Borrar el contenido default y pegar el de `Code.gs` de esta carpeta.
   - Reemplazar `SHEET_ID` con el ID copiado en el paso 1.
   - Reemplazar los 5 correos de `CALENDARIOS_DESTINO`.
   - `Code.gs` ya trae usuario/contraseña de edición (`CREDENCIALES`) — **este archivo nunca se sube a GitHub** (está en `.gitignore`), solo vive pegado en el editor de Apps Script y como copia local.
3. **Implementar → Nueva implementación**:
   - Tipo: Aplicación web.
   - Ejecutar como: **Yo** (jsolis@gruponxt.com).
   - Quién tiene acceso: **Cualquier usuario**.
   - Copiar la URL que termina en `/exec`.
4. Pegar esa URL en la constante `WEB_APP_URL` de `index.html` y `formulario.html`.
5. Pedir a las 5 personas destino que compartan su Google Calendar con `jsolis@gruponxt.com`, con permiso **"Hacer cambios en los eventos"** (Configuración de Calendar → "Compartir con determinadas personas").
6. Hacer commit y push de los cambios en `index.html`/`formulario.html` para que GitHub Pages los publique.

## Si ya tenías el Sheet con las 10 columnas anteriores (sin "Finalidad")

Inserta una columna nueva entre "Proyecto" y "Fecha" (clic derecho en la columna de "Fecha" → "Insertar 1 columna a la izquierda") y nómbrala `Finalidad`. Sheets recorre automáticamente los datos existentes. Vuelve a pegar el `Code.gs` actualizado en Apps Script y redespliega (Nueva versión).

## Prueba

- Llenar `formulario.html` con datos de prueba y confirmar que aparece el evento en los 5 calendarios y una fila nueva en el Sheet.
- Confirmar que el historial en `index.html` refleja esa fila (recargar o esperar ~20s).
- En el calendario, dar clic a esa ventana, iniciar sesión con las credenciales de `CREDENCIALES` en `Code.gs`, editar un campo y guardar; confirmar que el evento se actualiza en los 5 calendarios (no se duplica). Probar también "Eliminar ventana" y confirmar que el evento desaparece de los calendarios y el estatus queda "Cancelada".

## Nota de seguridad

El login de edición es una protección básica pensada para un solo usuario interno, no un sistema de autenticación real: la validación ocurre en el backend (Apps Script), no en el HTML, así que la contraseña nunca viaja visible en el código fuente de la página — pero tampoco hay hashing, sesiones ni límite de intentos. Suficiente para evitar ediciones accidentales o de terceros casuales; no usar esta contraseña en ningún otro sistema.
