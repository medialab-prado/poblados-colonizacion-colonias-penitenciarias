var exceso, reserva, exceptuadas;
var nombres;
var plot;

function setup() {
  createCanvas(800,519);
  nombres = new Array("Norte","Duero","Ebro","Pirineo","Jucar","Tajo","Guadiana","Guadalquivir","Sur", "Segura", "Islas");
  exceso = new Array(15267,35628,136465,3466,19615,64179,81809,148193,13326,35075,3235);
  reserva = new Array(12251,62730,131128,24433,54545,68854,82052,140453,20980,131042,5985);
  exceptuadas = new Array(7094,31194,128457,3289,15734,39460,21419,68830,23782,68386,15675);

  var pointSizes = [];
  var points = [];

  for (var n = 0; n < nombres.length; n++) {
    points[n] = new GPoint(exceso[n], exceptuadas[n], nombres[n]);
    pointSizes[n] = map(reserva[n],5000,141000,5,100);
  }

  // Creamos el plot
  plot = new GPlot(this);
  plot.setDim(width-230, height-100);
  plot.setTitleText("Tierras en exceso, reserva y exceptuadas por cuenca hidrografica segun PGC");
  plot.getXAxis().setAxisLabelText("Tierras en exceso (Has)");
  plot.getYAxis().setAxisLabelText("Tierras exceptuadas (Has)");
  plot.setPoints(points);
  plot.setPointSizes(pointSizes);
  plot.setPointColor(color(255,0,0,50));
  plot.setLineColor(color(0));
  plot.setLabelBgColor(color(255,0));
}


function draw() {
  background(255);

  // Draw the plot
  plot.beginDraw();
  plot.drawBox();
  plot.drawXAxis();
  plot.drawYAxis();
  plot.drawTitle();
  plot.drawGridLines(GPlot.BOTH);
  plot.drawPoints();
  plot.drawLabels();
  plot.drawAllLabels();
  plot.endDraw();

    textFont("Helvetica");
    textSize(11);
    fill(0);
    textAlign(LEFT);
    text("Tierras en reserva (Has)", 660, 330);
    textAlign(CENTER);
    stroke(100);
    noFill();
    ellipse(720, 390, 100, 100);
    fill(0);
    text("140000", 720, 390);
    noFill();
    ellipse(720, 455, 10, 10);
    fill(0);
    text("14000", 720, 475);
}
