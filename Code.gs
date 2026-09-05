/**
 * Backend de "Ventanas de Mantenimiento".
 * Desplegar como Web App: Ejecutar como "Yo", acceso "Cualquier usuario".
 *
 * CONFIGURACIÓN REQUERIDA antes de desplegar:
 * 1. Reemplazar SHEET_ID con el ID del Google Sheet de bitácora.
 * 2. Reemplazar los 5 correos en CALENDARIOS_DESTINO.
 */

var SHEET_ID = 'PON_AQUI_EL_ID_DEL_SHEET';
var SHEET_TAB = 'Solicitudes';

var CALENDARIOS_DESTINO = [
  'persona1@gruponxt.com',
  'persona2@gruponxt.com',
  'persona3@gruponxt.com',
  'persona4@gruponxt.com',
  'persona5@gruponxt.com'
];

function doPost(e) {
  var resultado = { ok: false, calendarios: {}, error: null };

  try {
    var datos = JSON.parse(e.postData.contents);

    var proyecto = String(datos.proyecto || '').trim();
    var fecha = String(datos.fecha || '').trim();       // 'YYYY-MM-DD'
    var hora = String(datos.hora || '').trim();         // 'HH:MM'
    var duracionHoras = parseFloat(datos.duracion) || 1;
    var solicitadaPor = String(datos.solicitadaPor || '').trim();
    var acceso = String(datos.acceso || '').trim();

    if (!proyecto || !fecha || !hora || !solicitadaPor) {
      throw new Error('Faltan campos requeridos (proyecto, fecha, hora, solicitadaPor).');
    }

    var inicio = new Date(fecha + 'T' + hora + ':00');
    var fin = new Date(inicio.getTime() + duracionHoras * 60 * 60 * 1000);

    var titulo = 'Ventana de mantenimiento: ' + proyecto;
    var descripcion = [
      'Proyecto: ' + proyecto,
      'Solicitada por: ' + solicitadaPor,
      'Duración: ' + duracionHoras + ' hora(s)',
      'Acceso para conectarse: ' + (acceso || 'No especificado')
    ].join('\n');

    var exitosos = [];
    var fallidos = [];

    CALENDARIOS_DESTINO.forEach(function (correo) {
      try {
        var cal = CalendarApp.getCalendarById(correo);
        if (!cal) throw new Error('Calendario no accesible (revisar permisos compartidos).');
        cal.createEvent(titulo, inicio, fin, { description: descripcion });
        resultado.calendarios[correo] = 'ok';
        exitosos.push(correo);
      } catch (errCal) {
        resultado.calendarios[correo] = 'error: ' + errCal.message;
        fallidos.push(correo);
      }
    });

    var estatus = fallidos.length === 0
      ? 'Creado en todos los calendarios'
      : 'Parcial: fallo en ' + fallidos.join(', ');

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
    sheet.appendRow([
      new Date(),
      proyecto,
      fecha,
      hora,
      duracionHoras,
      solicitadaPor,
      acceso,
      estatus
    ]);

    resultado.ok = fallidos.length === 0;
    resultado.estatus = estatus;
  } catch (err) {
    resultado.error = err.message;
  }

  return ContentService
    .createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatFecha(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(valor);
}

function formatHora(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), 'HH:mm');
  }
  return String(valor);
}

function doGet(e) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
  var valores = sheet.getDataRange().getValues();
  valores.shift(); // quitar encabezados

  var historial = valores.map(function (fila) {
    return {
      timestamp: fila[0] instanceof Date ? fila[0].toISOString() : String(fila[0]),
      proyecto: fila[1],
      // Sheets a veces auto-convierte estas celdas en objetos Date aunque se
      // escribieron como texto ('YYYY-MM-DD' / 'HH:MM') — se normalizan aquí
      // para que el calendario del frontend siempre reciba texto plano.
      fecha: formatFecha(fila[2]),
      hora: formatHora(fila[3]),
      duracion: fila[4],
      solicitadaPor: fila[5],
      estatus: fila[7]
      // Nota: la columna "acceso" (fila[6]) NO se expone aquí a propósito —
      // es información sensible (VPN/TeamViewer/IP) y este endpoint es público.
    };
  }).reverse();

  return ContentService
    .createTextOutput(JSON.stringify(historial))
    .setMimeType(ContentService.MimeType.JSON);
}
