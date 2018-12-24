var myIp = '156.35.98.203';
var limitSecondsForOpenDoor = 5; /* Variable definida en el Objeto inteligente */
var lastsDataReceive = [];
var realValueCollisionSensor = ""; //Si la puerta esta cerrada el sensor detecta colisión

var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var imagen = new Image();

imagen.src = "Puertas.jpg";

imagen.onload = function() {
    contexto.drawImage(imagen, 0, 0, imagen.width, imagen.height, 0, 0, 780, 620);
};

function valuesForRealSensor(){
    console.log("Researching real values");

    $('#data').html('<div>Sensor en la puerta 4 con IP: ' + myIp + '</div>' +
        '<div>Estado de la puerta: ' + realValueCollisionSensor + '</div>' +
        '<input type="button" value="Encender LED" class="btn" onclick="encenderLed()">' +
        '<input type="button" value="Apagar LED" class="btn" onclick="apagarLed()">');
}

function apagarLed(){
     var myRequest = new XMLHttpRequest();
     var url = 'http://' + myIp + '/index?apagar';
     myRequest.open("GET", url);
     myRequest.send();
     console.log("apagar");
 }
 
 function encenderLed(){
    var myRequest = new XMLHttpRequest();
     var url = 'http://' + myIp + '/index?encender';
     myRequest.open("GET", url);
     myRequest.send();
     console.log("encender");
 }

 
 function obtainDataFromArduino(){
    $.ajax({
     url: 'http://' + myIp + '/index?',
     type: 'post',
     dataType: 'json',
     success: function(data){
      console.log(data);
      realValueCollisionSensor = data.colision == 1 ? "CERRADA":"ABIERTA";
      var alert = true;
      /* Borro el primer elemento que entro en el array*/
      if(lastsDataReceive.length == 5){ 
          lastsDataReceive.splice(0,1);
        }
      lastsDataReceive.push(realValueCollisionSensor);
      for(var i = 0; i < lastsDataReceive.length; i++){
        if(lastsDataReceive[i] == "CERRADA"){
            alert = false;
        }
      } 
        if(alert && lastsDataReceive.length ==  limitSecondsForOpenDoor){
            $('#notification').html('El sensor con ip: ' + myIp + ' detecta que la puerta lleva abierta' +
             'más de ' + limitSecondsForOpenDoor + ' segundos.');
            $('#notification').css('background', 'orangered');
        } else {
                $('#notification').html('Todas las puertas están cerradas');
                $('#notification').css('background', 'greenyellow');
            }
        },
      error: function(){
        console.log("ERROR conectando con arduino");
      }
    });
}

$(document).ready(function(){
    setInterval(obtainDataFromArduino,1000);
});