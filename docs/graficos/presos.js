var ids, cuencas;
var idZonas, zonas;


function preload() {
  nombres = new Array("SCPM1","SCPM1","SCPM2","SCPM3","SCPM3bis","SCPM4","SCPM4","SCPM6","SCPM7");
  inicio = new Array(1939,1944,1941,1940,1953,1940,1950,1942,-1);
  final = new Array(1944,1960,1957,1953,1959,1944,1953,1944,1956);
}


function setup() {
  ids = new Array("guadiana","guadalquivir-presos","tajo","ebro");
  cuencas = new Array();
  for (var n = 0; n < ids.length; n++) {
    cuencas[n] = loadImage("data/" + ids[n]+".png");
  }
  zonas = [];
  idZonas = [];
  idZonas[0] = new Array("montijo", "la_mancha");
  idZonas[1] = new Array("bajo_guadalquivir", "viar");
  idZonas[2] = new Array("alberche", "jarama", "rosarito");
  idZonas[3] = new Array("violada", "aragon_cataluna", "tarrega");
  for (var n = 0; n < ids.length; n++) {
    zonas[n] = []
    for (var m = 0; m < idZonas[n].length; m++) {
      zonas[n][m] = loadImage("data/"+idZonas[n][m]+".png");
    }
  }

  createCanvas(655,519);

}


function draw() {
  background(200,225,225);
  for (var n = 0; n < nombres.length; n++) {
    var x = 100;
    var y = map(n,0,nombres.length,300, 500);
  }
}
