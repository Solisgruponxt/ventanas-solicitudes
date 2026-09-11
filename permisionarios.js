// Lista compartida de permisionarios (orden alfabético), usada por formulario.html e index.html.
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

function poblarSelectPermisionario(select, valorPorDefecto) {
  var opciones = ['<option value="" disabled' + (valorPorDefecto ? '' : ' selected') + '>Selecciona un permisionario</option>'];
  opciones = opciones.concat(PERMISIONARIOS.map(function (p) {
    var sel = p === valorPorDefecto ? ' selected' : '';
    return '<option value="' + p.replace(/"/g, '&quot;') + '"' + sel + '>' + p + '</option>';
  }));
  select.innerHTML = opciones.join('');
}
