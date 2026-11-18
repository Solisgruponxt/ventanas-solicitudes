// Lista base de permisionarios, usada por formulario.html.
// Los que se agregan desde el formulario ("+ Agregar permisionario") se guardan
// en la pestaña "Permisionarios" del Sheet y se combinan con esta lista al cargar.
const PERMISIONARIOS = [
  'Acciona',
  'Atco EGO',
  'Autlan',
  'Balam',
  'Cemex Eurus',
  'Demex',
  'Demex Bimbo PME',
  'EDI Eoliatec del Istmo',
  'EDP',
  'EDP Eoliatec del Pacifico',
  'EGU',
  'EGU PME',
  'Energia Real',
  'Energia Real VMN',
  'Eolica Arriaga PME',
  'Eolica el Retiro',
  'ETM1',
  'ETM2',
  'Fenix',
  'Grupo Dragon',
  'Grupo Dragon DSP',
  'Grupo Mexico Eolica el Retiro',
  'Iberdrola',
  'Infra',
  'Kino Enel',
  'Naturgy',
  'PE Ingenio Sureste',
  'Red_energia',
  'Saavi',
  'Sanchez',
  'TRE',
  'Vesta Suministrador'
];

// Lista vigente (base + guardados en el Sheet), sin duplicados y en orden alfabético.
var permisionariosActuales = PERMISIONARIOS.slice();

function combinarPermisionarios(extra) {
  var vistos = {};
  var lista = [];
  PERMISIONARIOS.concat(extra || []).forEach(function (p) {
    var nombre = String(p || '').trim();
    var clave = nombre.toLowerCase();
    if (nombre && !vistos[clave]) {
      vistos[clave] = true;
      lista.push(nombre);
    }
  });
  lista.sort(function (a, b) { return a.localeCompare(b, 'es', { sensitivity: 'base' }); });
  permisionariosActuales = lista;
  return lista;
}

function escaparOpcion(p) {
  return String(p).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function poblarSelectPermisionario(select, valorPorDefecto) {
  var opciones = ['<option value="" disabled' + (valorPorDefecto ? '' : ' selected') + '>Selecciona un permisionario</option>'];
  opciones = opciones.concat(permisionariosActuales.map(function (p) {
    var sel = p === valorPorDefecto ? ' selected' : '';
    return '<option value="' + escaparOpcion(p) + '"' + sel + '>' + escaparOpcion(p) + '</option>';
  }));
  select.innerHTML = opciones.join('');
}

// Trae del backend los permisionarios agregados manualmente y vuelve a pintar el
// select conservando la selección actual. Si falla, se queda con la lista base.
function cargarPermisionariosGuardados(webAppUrl, select) {
  return fetch(webAppUrl + '?recurso=permisionarios')
    .then(function (res) { return res.json(); })
    .then(function (extra) {
      // Si el backend aún no tiene esta versión, doGet devuelve el historial
      // (objetos); solo se aceptan textos.
      if (!Array.isArray(extra)) return;
      extra = extra.filter(function (p) { return typeof p === 'string'; });
      if (!extra.length) return;
      combinarPermisionarios(extra);
      poblarSelectPermisionario(select, select.value);
    })
    .catch(function () { /* sin conexión: se usa la lista base */ });
}
