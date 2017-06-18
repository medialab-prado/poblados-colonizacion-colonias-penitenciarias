var cuencas, cmap;
var nombres,colores,x,y;
var canales, acequias;
var totCanales = 0,totAcequias = 0;
var cuenta = 0, last;

function setup() {
  createCanvas(800,519);
  cuencas = loadImage("data/cuencas.png");
  cmap = loadImage("data/cmap-cuencas.png");
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Baleares y Canarias");
  colores = new Array("#f00","#0f0","#00f","#ff0","#0ff","#a00","#0a0","#00a","#aa0","#0aa", "#aaa");
  canales = new Array(157.3,1422.1,810, 132.5,525.7,764.9,360.5,1111.7,266.7,85.7,-1);
  acequias= new Array(448.1,2215.3,1872.7,258.7,2378,1356.7,1210.5,1215.7,191.7,2004.1,-1);
  x = new Array(158,243, 449, 597, 432, 308, 236, 263, 362,412, 601);
  y = new Array(77,158,140, 139,278, 253, 327, 393, 441,368, 322);

  for (var n = 0; n < nombres.length; n++) {
    if (canales[n] != -1) totCanales = totCanales + canales[n];
    if (acequias[n] != -1) totAcequias = totAcequias + acequias[n];
  }
}

function draw() {
  background("#cad2d3");
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
      if (canales[n] != -1) {
        text("Canales: " + canales[n] + " Km", x[n], y[n]+5);
        text("Acequias: " + acequias[n] + " Km", x[n], y[n]+20);
      }
      else {
        textSize(10);
        text("(Sin datos)", x[n], y[n]+5);
      }
    }
  }

  // nombres
  textStyle(BOLD);
  textSize(14);
  for (var n = 0; n < nombres.length; n++) {
    var nbr = nombres[n].toUpperCase();
    fill(255);
    noStroke();
    fill(0);
    text(nbr, x[n], y[n]-10);
  }

  cuenta = cuenta + 0.5;

  // Canales
  for (var n = 0; n < nombres.length; n++) {
    if (!over[n]) {
      if (canales[n] == -1) {
        textSize(10);
        fill(0);
        text("(Sin datos)", x[n], y[n]+5);
      }
      var pct = map(canales[n]/totCanales,0,1,0,50);
      for (var i = 0; i < min(cuenta,pct); i++) {
        var xi = x[n] + 10*i;
        stroke(0);
        line(xi+3, y[n]-4,xi+10+3,y[n]-4);
        noStroke();
        fill(0);
        quad(xi+10+4,y[n]-4,xi+10+4,y[n]-4+7, xi+10,y[n]+7, xi+10,y[n]);
        fill(0,255,255);
        quad(xi+3, y[n]-3,xi+10+3,y[n]-3,xi+10,y[n],xi, y[n]);
        noStroke();
        fill(0);
        rect(xi, y[n],10,7)
        fill(255);
        arc(xi+5,y[n]+7,7,8,PI,TWO_PI);
      }
    }
  }

  // Acequias
  for (var n = 0; n < nombres.length; n++) {
    if (!over[n]) {
      pct = map(acequias[n]/totAcequias,0,1,0,50);
      for (var i = 0; i < min(cuenta,pct); i++) {
        var xi = x[n] + 10*i;
        stroke(0);
        line(xi, y[n]+15,xi+10,y[n]+15);
        line(xi+3, y[n]+15-3,xi+10+3,y[n]+15-3);
        noStroke();
        fill(0);
        quad(xi+10+4,y[n]+15-3, xi+10+4,y[n]+15+4-3-1,  xi+10, y[n]+15+4, xi+10, y[n]+15);
        fill(0,255,255);
        quad(xi+3, y[n]+15-2,xi+10+3,y[n]+15-2, xi+10,y[n]+15,xi, y[n]+15);
        fill(0);
        rect(xi, y[n]+15, 10, 4);
      }
    }
  }
  // Titulo
  fill(255,200);
  stroke(155);
  rect(605, 365, 170, 130);
  fill(0);
  textStyle(BOLD);
  textSize(12);
  text("CANALES Y ACEQUIAS POR CUENCA HIDRÁULICA", 620, 380, 150, 80);
  textStyle(NORMAL);
  textSize(11);
  noStroke();
  fill(155,0,0);
  text("Interacción con el ratón:",620, 430, 150, 20);
  fill(0);
  text("Canales y acequias (Km) construidos en la cuenca durante la colonización", 620, 445, 150, 80);

}

function compara(c1, c2) {
  return red(c1) == red(c2) && green(c1) == green(c2) && blue(c1) == blue(c2);
}
