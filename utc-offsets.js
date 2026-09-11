// Lista compartida de offsets UTC, usada por formulario.html (registro).
const UTC_OFFSETS = [
  '-12:00', '-11:00', '-10:00', '-09:30', '-09:00', '-08:00', '-07:00',
  '-06:00', '-05:00', '-04:00', '-03:30', '-03:00', '-02:00', '-01:00',
  '+00:00',
  '+01:00', '+02:00', '+03:00', '+03:30', '+04:00', '+04:30', '+05:00',
  '+05:30', '+06:00', '+06:30', '+07:00', '+08:00', '+09:00', '+09:30',
  '+10:00', '+10:30', '+11:00', '+12:00', '+13:00', '+14:00'
];

// País(es) de referencia para cada offset, para que quien llena el formulario
// ubique fácilmente su zona horaria sin tener que saber el offset de memoria.
const UTC_PAIS = {
  '-12:00': 'Línea de fecha internacional',
  '-11:00': 'Samoa',
  '-10:00': 'Hawái (EUA)',
  '-09:30': 'Islas Marquesas',
  '-09:00': 'Alaska (EUA)',
  '-08:00': 'México (Baja California), California (EUA)',
  '-07:00': 'México (Sonora, Chihuahua), Colorado (EUA)',
  '-06:00': 'México (CDMX y la mayoría del país), Guatemala, Costa Rica',
  '-05:00': 'México (Quintana Roo), Colombia, Perú, Nueva York (EUA)',
  '-04:00': 'Bolivia, República Dominicana, Venezuela',
  '-03:30': 'Terranova (Canadá)',
  '-03:00': 'Argentina, Brasil (São Paulo), Uruguay',
  '-02:00': 'Fernando de Noronha (Brasil)',
  '-01:00': 'Azores (Portugal)',
  '+00:00': 'Reino Unido, Portugal',
  '+01:00': 'España, Francia, Alemania',
  '+02:00': 'Egipto, Sudáfrica, Finlandia',
  '+03:00': 'Rusia (Moscú), Arabia Saudita',
  '+03:30': 'Irán',
  '+04:00': 'Emiratos Árabes Unidos, Georgia',
  '+04:30': 'Afganistán',
  '+05:00': 'Pakistán',
  '+05:30': 'India, Sri Lanka',
  '+06:00': 'Bangladés',
  '+06:30': 'Myanmar',
  '+07:00': 'Tailandia, Vietnam',
  '+08:00': 'China, Singapur, Filipinas',
  '+09:00': 'Japón, Corea del Sur',
  '+09:30': 'Australia (Adelaida)',
  '+10:00': 'Australia (Sídney)',
  '+10:30': 'Australia (Lord Howe)',
  '+11:00': 'Islas Salomón',
  '+12:00': 'Nueva Zelanda',
  '+13:00': 'Tonga',
  '+14:00': 'Kiribati'
};

function poblarSelectUTC(select, valorPorDefecto) {
  select.innerHTML = UTC_OFFSETS.map(function (off) {
    var etiqueta = 'UTC' + (off === '+00:00' ? '±00:00' : off) + (UTC_PAIS[off] ? ' — ' + UTC_PAIS[off] : '');
    var seleccionado = off === valorPorDefecto ? ' selected' : '';
    return '<option value="' + off + '"' + seleccionado + '>' + etiqueta + '</option>';
  }).join('');
}
