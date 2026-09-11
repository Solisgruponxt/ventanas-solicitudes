# Ventanas de Mantenimiento — Solicitudes

Página pública para registrar solicitudes de ventana de mantenimiento; cada solicitud crea un evento en 5 Google Calendar fijos y queda registrada en un Google Sheet.

## Configuración manual (una sola vez)

1. Crear un Google Sheet nuevo desde `jsolis@gruponxt.com` llamado "Bitácora Ventanas Mantenimiento".
   - Renombrar la primera pestaña a `Solicitudes`.
   - Fila 1 (encabezados, 17 columnas): `ID | Timestamp | Permisionario | Finalidad | Fecha | Hora Inicio | Duración (h) | Solicitante Nombre | Acceso | Estatus | EventosJSON | Cliente | Solicitante Correo | Solicitante Teléfono | UTC | Tipo de Conexión | Hora Fin`.
   - "Duración (h)" se calcula automáticamente (Hora Fin − Hora Inicio), el formulario ya no la pide.
   - La lista de Permisionarios que aparece en el formulario vive en `permisionarios.js` (array `PERMISIONARIOS`, orden alfabético) — para agregar/quitar uno, editar ese archivo y hacer commit+push.
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
   - Al implementar (o la primera vez que se ejecute) pedirá autorizar el alcance de **Google Drive** — es para guardar las imágenes de acceso que se pegan en el formulario, en una carpeta "Ventanas Mantenimiento - Accesos" dentro del Drive de `jsolis@gruponxt.com`.
4. Pegar esa URL en la constante `WEB_APP_URL` de `index.html` y `formulario.html`.
5. Pedir a las 5 personas destino que compartan su Google Calendar con `jsolis@gruponxt.com`, con permiso **"Hacer cambios en los eventos"** (Configuración de Calendar → "Compartir con determinadas personas").
6. Hacer commit y push de los cambios en `index.html`/`formulario.html`/`utc-offsets.js` para que GitHub Pages los publique.

## Si ya tenías el Sheet con columnas de una versión anterior

Agrega al final las columnas que falten: `Cliente | Solicitante Correo | Solicitante Teléfono | UTC | Tipo de Conexión | Hora Fin`. Puedes renombrar "Proyecto" a "Permisionario" y "Solicitada por" a "Solicitante Nombre" para que coincida, aunque el backend no depende del texto del encabezado, solo del orden de las columnas. Sheets recorre automáticamente los datos existentes; las filas viejas simplemente tendrán esas columnas nuevas vacías. Vuelve a pegar el `Code.gs` actualizado en Apps Script y redespliega (Nueva versión).

## Prueba

- Llenar `formulario.html` con datos de prueba y confirmar que aparece el evento en los 5 calendarios y una fila nueva en el Sheet.
- Confirmar que el historial en `index.html` refleja esa fila (recargar o esperar ~20s).
- En el calendario, dar clic a esa ventana, iniciar sesión con las credenciales de `CREDENCIALES` en `Code.gs`, editar un campo y guardar; confirmar que el evento se actualiza en los 5 calendarios (no se duplica). Probar también "Eliminar ventana" y confirmar que el evento desaparece de los calendarios y el estatus queda "Cancelada".

## Nota de seguridad

El login de edición es una protección básica pensada para un solo usuario interno, no un sistema de autenticación real: la validación ocurre en el backend (Apps Script), no en el HTML, así que la contraseña nunca viaja visible en el código fuente de la página — pero tampoco hay hashing, sesiones ni límite de intentos. Suficiente para evitar ediciones accidentales o de terceros casuales; no usar esta contraseña en ningún otro sistema.
