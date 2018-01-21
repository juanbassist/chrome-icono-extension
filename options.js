// Saves options to chrome.storage.sync.
function save_options() {
  var notificacion_activada = document.getElementById('notificacion_activada').checked;
  var valor_alto_xrp = document.getElementById('valor_alto_xrp').value;
  var valor_bajo_xrp = document.getElementById('valor_bajo_xrp').value;
  var intervalo_tiempo_ms = document.getElementById('intervalo_tiempo_ms').value;
  chrome.storage.sync.set({
    notificacion_activada: notificacion_activada,
    valor_alto_xrp: valor_alto_xrp,
    valor_bajo_xrp: valor_bajo_xrp,
    intervalo_tiempo_ms: intervalo_tiempo_ms
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    notificacion_activada: true,
    valor_alto_xrp: 0,
    valor_bajo_xrp: 0,
    intervalo_tiempo_ms: 0
  }, function(items) {
    document.getElementById('notificacion_activada').checked = items.notificacion_activada;
    document.getElementById('valor_alto_xrp').value = items.valor_alto_xrp;
    document.getElementById('valor_bajo_xrp').value = items.valor_bajo_xrp;
    document.getElementById('intervalo_tiempo_ms').value = items.intervalo_tiempo_ms;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);