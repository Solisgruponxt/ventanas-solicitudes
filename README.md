# Ventanas de Mantenimiento — Solicitudes

Página pública para registrar solicitudes de ventana de mantenimiento; cada solicitud crea un evento en 5 Google Calendar fijos y queda registrada en un Google Sheet.

## Configuración manual (una sola vez)

1. Crear un Google Sheet nuevo desde `jsolis@gruponxt.com` llamado "Bitácora Ventanas Mantenimiento".
   - Renombrar la primera pestaña a `Solicitudes`.
   - Fila 1 (encabezados): `Timestamp | Proyecto | Fecha | Hora | Duración (h) | Solicitada por | Acceso | Estatus`.
   - Copiar el ID del Sheet (de la URL, entre `/d/` y `/edit`).
2. En ese Sheet: **Extensiones → Apps Script**. Borrar el contenido default y pegar el de `Code.gs` de esta carpeta.
   - Reemplazar `SHEET_ID` con el ID copiado en el paso 1.
   - Reemplazar los 5 correos de `CALENDARIOS_DESTINO`.
3. **Implementar → Nueva implementación**:
   - Tipo: Aplicación web.
   - Ejecutar como: **Yo** (jsolis@gruponxt.com).
   - Quién tiene acceso: **Cualquier usuario**.
   - Copiar la URL que termina en `/exec`.
4. Pegar esa URL en la constante `WEB_APP_URL` de `index.html` y `formulario.html`.
5. Pedir a las 5 personas destino que compartan su Google Calendar con `jsolis@gruponxt.com`, con permiso **"Hacer cambios en los eventos"** (Configuración de Calendar → "Compartir con determinadas personas").
6. Hacer commit y push de los cambios en `index.html`/`formulario.html` para que GitHub Pages los publique.

## Prueba

- Llenar `formulario.html` con datos de prueba y confirmar que aparece el evento en los 5 calendarios y una fila nueva en el Sheet.
- Confirmar que el historial en `index.html` refleja esa fila (recargar o esperar ~20s).
