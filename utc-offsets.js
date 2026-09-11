// Lista compartida de offsets UTC, usada por formulario.html (registro) e index.html (edición).
const UTC_OFFSETS = [
  '-12:00', '-11:00', '-10:00', '-09:30', '-09:00', '-08:00', '-07:00',
  '-06:00', '-05:00', '-04:00', '-03:30', '-03:00', '-02:00', '-01:00',
  '+00:00',
  '+01:00', '+02:00', '+03:00', '+03:30', '+04:00', '+04:30', '+05:00',
  '+05:30', '+06:00', '+06:30', '+07:00', '+08:00', '+09:00', '+09:30',
  '+10:00', '+10:30', '+11:00', '+12:00', '+13:00', '+14:00'
];

function poblarSelectUTC(select, valorPorDefecto) {
  select.innerHTML = UTC_OFFSETS.map(function (off) {
    var etiqueta = 'UTC' + (off === '+00:00' ? '±00:00' : off);
    var seleccionado = off === valorPorDefecto ? ' selected' : '';
    return '<option value="' + off + '"' + seleccionado + '>' + etiqueta + '</option>';
  }).join('');
}
