var cuencas, cmap;
var ids,nombres,colores,x,y;
var capas,capaspg,imgs;
var dim, dimr;
var pg;
var zoom;

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
  pg = createGraphics(800, 519);
  var as = 519. / 800.;
  var zoom = .95;
  var w = windowWidth*zoom;
  var h = windowHeight*as*zoom;

  createCanvas(w,h);
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Baleares y Canarias");
  colores = new Array("#f00","#0f0","#00f","#ff0","#0ff","#a00","#0a0","#00a","#aa0","#0aa", "#aaa");
  x = new Array(158,243, 429, 597, 432, 268, 226, 253, 362,432, 611);
  y = new Array(77,158,140, 139,278, 263, 327, 393, 441, 368, 322);
}


function draw() {

  // Resize:
  var w = min(800,width*.85);
  var h = w*519./800.;
  zoom = w*800.;
  var mx = map(mouseX-width/2+w/2,0,w,0,800);
  var my = map(mouseY-height/2+h/2,0,h,0,519);


  pg.background("#cad2d3");
  // capas
  for (var n = 0; n < ids.length; n++) {
    if (dimr[n] != -1) pg.image(capas[n],0,0);
    else {
      pg.image(imgs[n], 0, 0);
    }
  }

  // Parcelas segun PGC
  var mc = cmap.get(mx,my);
  for (var n = 0; n < colores.length; n++) {
    if (compara(mc,color(colores[n]))) {
      pg.tint(255,100);
      pg.image(capaspg[n],0, 0);
      pg.noTint();
    }
  }


  // nombres
  pg.textSize(14);
  for (var n = 0; n < nombres.length; n++) {
    //var nbr = String.prototype.toUpperCase(nombres[n]);
    if (dimr[n] != -1 || !compara(mc,color(colores[n]))) fill(0);
    else fill(0);
    pg.noStroke();
    pg.textStyle(BOLD);

    pg.text(nombres[n], x[n], y[n]-10);
    pg.textStyle(NORMAL);
    if (compara(mc,color(colores[n]))) {
        pg.text("Plan inicial: " + dim[n]+"  Has", x[n], y[n]+5);
    }
    else {
      pg.noStroke();
      if (dimr[n] != -1) pg.text("Parcela media: " + dimr[n]+" Has", x[n], y[n]+5);
      else pg.text("(Sin datos)", x[n], y[n]+5);
    }
  }

  // Titulo
  pg.fill(255,200);
  pg.stroke(155);
  pg.rect(605, 365, 170, 130);
  pg.fill(0);
  pg.textStyle(BOLD);
  pg.textSize(12);
  pg.text("TAMAÑO MEDIO DE EXPLOTACIÓN ENTREGADA A COLONO", 620, 380, 150, 80);
  pg.textStyle(NORMAL);
  pg.textSize(11);
  pg.noStroke();
  pg.fill(155,0,0);
  pg.text("Interacción con el ratón:",620, 430, 150, 20);
  pg.fill(0);
  pg.text("Datos reales (verde) frente a datos según Plan de Colonización (blanco)", 620, 445, 150, 80);
  background("#cad2d3");
  imageMode(CENTER);
  image(pg,width/2, height/2,w,h);
}



function compara(c1, c2) {
  return red(c1) == red(c2) && green(c1) == green(c2) && blue(c1) == blue(c2);
}

function windowResized() {
  resizeCanvas(windowWidth*zoom, windowHeight*zoom);
}
