var notificacion_activada;
var valor_bajo_xrp;
var valor_actual_xrp = 29;//temp
var intervalo_tiempo_ms;
var parametros_sync = [
  "notificacion_activada",
  "valor_bajo_xrp", 
  "valor_alto_xrp",
  "intervalo_tiempo_ms"]

/* Se ejecuta al momento de cargar el script */
chrome.runtime.onInstalled.addListener(function callback(){
  console.log("startup3");
  sincronizar_parametros_globales(iniciar_verificador);
  
  //chrome.runtime.sendMessage('Hola mundo');
  //var xhr = new XMLHttpRequest();
  //xhr.open("GET", "http://www.example.com?par=0", false);
  //xhr.send();  
  //console.log(xhr.responseText);
});

/* Sincroniza datos del storage con los valores globales */
function sincronizar_parametros_globales(callback) {
  chrome.storage.sync.get(
    parametros_sync, function (items) {
      // Si el parametro se encuentra indefinido, la variable global conserva su anterior valor.
      notificacion_activada = items.notificacion_activada != undefined ? items.notificacion_activada : notificacion_activada;
      valor_bajo_xrp = items.valor_bajo_xrp != undefined ? items.valor_bajo_xrp : valor_bajo_xrp;
      valor_actual_xrp = items.valor_actual_xrp != undefined ? items.valor_actual_xrp : valor_actual_xrp;
      intervalo_tiempo_ms = items.intervalo_tiempo_ms != undefined ? items.intervalo_tiempo_ms : intervalo_tiempo_ms;
      if (callback !== null) callback();
  });
};

var iniciar_verificador = function () {
  //console.log("intervalo_tiempo_ms %s", intervalo_tiempo_ms);
  notificar_si_cayo_precio();
  setTimeout(iniciar_verificador, intervalo_tiempo_ms)
  // TODO hacer incovaciones rest con XPATH para obtener el valor de un elemento HTML
};

function notificar_si_cayo_precio() {
  console.log("valor_bajo_xrp %s valor_actual_xrp %s", valor_bajo_xrp, valor_actual_xrp);
  if (valor_bajo_xrp >= valor_actual_xrp && notificacion_activada) {
      notificar_evento("XRP/MXN Cayo a $30 valor CMC: $29.88")
    }
}

function notificar_evento(mensaje){
  var options = {
    type: "basic", //basic
    title: "Notificación",
    message: mensaje,
    iconUrl: "icono.png"
  };
  chrome.storage.sync.set(
    {notificacion_activada: false}
  ), sincronizar_parametros_globales(null);
  chrome.notifications.create(options);
}


/*Al cambiar una opcion del storage, ej. el valor del precio */
chrome.storage.onChanged.addListener(function() {
  sincronizar_parametros_globales(null);
});

/* Atrapar evento cuando se da clic en el popup
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("icon clicked3");
});*/


