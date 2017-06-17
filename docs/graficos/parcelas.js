var cuencas, cmap;
var ids,nombres,colores,x,y;
var capas,capaspg,imgs;
var dim, dimr;

function preload() {
  ids = new Array("norte","duero","ebro","pirineo","jucar","tajo","guadiana","guadalquivir","sur","segura","baleares");
  dimr = new Array(11,8.4,11,-1,6,7.5,8.6,5.3,5.9,6.6,-1);
  dim = new Array(12,10,14.2,8,7.6,8,7.6,10,4.7,10,11);
  imgs = new Array();
  capas = new Array();
  capaspg = new Array();
  for (var n = 0; n < ids.length; n++) {
    imgs[n] = loadImage("data/"+ids[n]+".png");
    capaspg[n] = loadImage("data/capa-PGC-"+n+".png");
    if (dim[n] != -1) {
      capas[n] = loadImage("data/capa-"+n+".png");
    }
  }
  cuencas = loadImage("data/cuencas.png");
  cmap = loadImage("data/cmap-cuencas.png");
}

function setup() {
  createCanvas(windowWidth,519);
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Baleares y Canarias");
  colores = new Array("#f00","#0f0","#00f","#ff0","#0ff","#a00","#0a0","#00a","#aa0","#0aa", "#aaa");
  x = new Array(158,243, 429, 597, 432, 268, 226, 253, 362,432, 611);
  y = new Array(77,158,140, 139,278, 263, 327, 393, 441, 368, 322);
}


function draw() {
  background(200,225,225);
  translate((width-519)*.5,0);
  // capas
  for (var n = 0; n < ids.length; n++) {
    if (dimr[n] != -1) image(capas[n],0,0);
    else {
      image(imgs[n],0,0);
    }
  }

  // Parcelas segun PGC
  var mc = cmap.get(mouseX,mouseY);
  for (var n = 0; n < colores.length; n++) {
    if (compara(mc,color(colores[n]))) {
      tint(255,100);
      image(capaspg[n],0,0);
      noTint();
    }
  }


  // nombres
  textSize(14);
  for (var n = 0; n < nombres.length; n++) {
    var nbr = String.prototype.toUpperCase(nombres[n]);
    if (dimr[n] != -1 || !compara(mc,color(colores[n]))) fill(0);
    else fill(0);
    //textStyle(BOLD);
    text(nbr, x[n], y[n]-10);
    textStyle(NORMAL);
    if (compara(mc,color(colores[n]))) {
        text("Plan inicial: " + dim[n]+"  Has", x[n], y[n]+5);
    }
    else {
      if (dimr[n] != -1) text("Parcela media: " + dimr[n]+" Has", x[n], y[n]+5);
      else text("(Sin datos)", x[n], y[n]+5);
    }
  }
}



function compara(c1, c2) {
  return red(c1) == red(c2) && green(c1) == green(c2) && blue(c1) == blue(c2);
}
