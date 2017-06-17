var cuencas, cmap;
var nombres,colores,x,y;
var tractores, cosechadoras;
var totTractores = 0,totCosechadoras = 0;
var cuenta = 0, last;
var imgTractor,imgCosechadora;

function setup() {
  createCanvas(800,519);
  cuencas = loadImage("data/cuencas.png");
  cmap = loadImage("data/cmap-cuencas.png");
  imgTractor = loadImage("data/tractor_792349_cc_p.png");
  imgCosechadora = loadImage("data/harvester_1046427_cc_p.png");
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Baleares y Canarias");
  colores = new Array("#f00","#0f0","#00f","#ff0","#0ff","#a00","#0a0","#00a","#aa0","#0aa", "#aaa");
  tractores = new Array(31.5,32.8,81.4,-1,128.5,37.6,59.1,30.6,11.2,34.6,-1);
  cosechadoras= new Array(0,1.2,2.8,-1,5,0.6,0.9,2.6,0.2,0.5,-1);

  x = new Array(128,233, 409, 597, 392, 248, 206, 217, 362,402, 651);
  y = new Array(77,128,110, 139,248, 243, 307, 390, 431,368, 322);

  for (var n = 0; n < nombres.length; n++) {
    if (tractores[n] != -1) totTractores = totTractores + tractores[n];
    if (cosechadoras[n] != -1) totCosechadoras = totCosechadoras + cosechadoras[n];
  }
}

function draw() {
  background(200,225,225);
  image(cuencas,0,0);


  var mc = cmap.get(mouseX,mouseY);
  var over = [];
  for (var n = 0; n < colores.length; n++) {
    over[n] = compara(mc,color(colores[n]));
  }

  for (var n = 0; n < colores.length; n++) {
    if (over[n]) {
      fill(0);
      textStyle(NORMAL);
      if (tractores[n] != -1) {
        text("Tractores: " + tractores[n], x[n], y[n]+10);
        text("Cosechadoras: " + cosechadoras[n], x[n], y[n]+25);
      }
      else {
        textSize(10);
        text("(Sin datos)", x[n], y[n]+5);
      }
    }
  }


  cuenta = cuenta + 0.5;

  // Cosechadoras
  var mpct = [];
  for (var n = 0; n < nombres.length; n++) {
    if (!over[n]) {
      pct = map(cosechadoras[n]/totCosechadoras,0,1,0,40);
      mpct[n] = floor(pct)+1;
      for (var i = 0; i < min(cuenta,pct); i++) {
        var xi = x[n] + 20*(i%4);
        var yi = y[n] + floor(i/4)*20;
        image(imgCosechadora,xi,yi,20,20);
      }
    }
  }

  // Tractores
  for (var n = 0; n < nombres.length; n++) {
    if (!over[n]) {
      if (tractores[n] == -1) {
        textSize(10);
        textStyle(NORMAL);
        fill(0);
        text("(Sin datos)", x[n], y[n]+5);
      }
      var pct = map(tractores[n]/totTractores,0,1,0,40);
      for (var i = 0; i < min(cuenta,pct); i++) {
        var xi = x[n] + 20*(i%4) + min(4,mpct[n])*20;
        var yi = y[n] + floor(i/4)*20;
        image(imgTractor,xi,yi,18,18);
      }
    }
  }

  // nombres
  textStyle(BOLD);
  textSize(14);
  for (var n = 0; n < nombres.length; n++) {
    var nbr = nombres[n];
    fill(0);
    text(nbr, x[n], y[n]-7);
  }
}

function compara(c1, c2) {
  return red(c1) == red(c2) && green(c1) == green(c2) && blue(c1) == blue(c2);
}
