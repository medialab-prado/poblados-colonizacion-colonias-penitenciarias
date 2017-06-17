var cuencas, cmap;
var ids,nombres,colores,x,y;
var capas,imgs;
var dim;

function preload() {
  ids = new Array("norte","duero","ebro","pirineo","jucar","tajo","guadiana","guadalquivir","sur","segura","baleares");
  imgs = new Array();
  for (var n = 0; n < ids.length; n++) {
    imgs[n] = loadImage("data/"+ids[n]+".png");
  }
  cuencas = loadImage("data/cuencas.png");
  cmap = loadImage("data/cmap-cuencas.png");
}

function setup() {
  createCanvas(800,519);
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Baleares y Canarias");
  colores = new Array("#f00","#0f0","#00f","#ff0","#0ff","#a00","#0a0","#00a","#aa0","#0aa", "#aaa");
  x = new Array(158,243, 449, 597, 432, 308, 236, 263, 362,432, 651);
  y = new Array(77,158,140, 139,278, 253, 327, 393, 441,368, 322);
  dim = new Array(11,8.4,11,-1,6,7.5,8.6,5.3,5.9,6.6,-1);
  capas = new Array();
  for (var n = 0; n < ids.length; n++) {
    capas[n] = createImage(width,height);
    capas[n].loadPixels();

    if (dim[n] != -1) {
      var paso = map(dim[n],0, 15, 2, 20);

      colorMode(HSB,360,255,255);
      var h = random(70,130);
      var numi = floor(width/paso)+1;
      var numj = floor(height/paso)+1;
      var c = [];
      for (var i = 0; i < numi; i++) {
        c[i] = [];
        for (var j = 0; j < numj; j++) {
          var s = random(100,200);
          c[i][j] = color(h, s, random(150,200) );
        }
      }
      colorMode(RGB,255,255,255);
      for (var i = 0; i < width; i++) {
        var pasoi = floor(i/paso);
        for (var j = 0; j < height; j++) {
          var pasoj = floor(j/paso);
          capas[n].set(i,j,c[pasoi][pasoj]);
        }
      }
      capas[n].updatePixels();
      capas[n].mask(imgs[n]);
    }
  }
}

function draw() {
  background(200,225,225);

  // capas
  for (var n = 0; n < ids.length; n++) {
    tint(200,180,130);
    image(imgs[n],0,0);
    tint(255,min(frameCount*40,255));
    if (dim[n] != -1) image(capas[n],0,0);
    else text("(Sin datos)", x[n], y[n]+5);
  }

  // Mas datos
  var mc = cmap.get(mouseX,mouseY);
  for (var n = 0; n < colores.length; n++) {
    if (compara(mc,color(colores[n]))) {
      noTint();
      image(imgs[n],0,0);
    }
  }


  // nombres
  textSize(14);
  for (var n = 0; n < nombres.length; n++) {
    var nbr = nombres[n];
    fill(255);
    noStroke();
    fill(0);
    text(nbr, x[n], y[n]-10);
  }
}



function compara(c1, c2) {
  return red(c1) == red(c2) && green(c1) == green(c2) && blue(c1) == blue(c2);
}
