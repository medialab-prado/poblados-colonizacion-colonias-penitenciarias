import csv
import os.path
from owslib.wms import WebMapService
wms = WebMapService('http://www.ign.es/wms-inspire/pnoa-ma', version='1.1.1')


f = open('embalses.csv','r')
reader = csv.reader(f)

rownum = 0
for row in reader:
    if rownum > 0:
        name = row[1]               # nombre del embalse
        year = row[7].split("-")[2] # anyo
        if year:
            name = "".join([c for c in name if c.isalpha() or c.isdigit() or c==' ']).rstrip()
            nombre = year + "-" + name + ".jpeg"
            folder = 'imgs-todos/'

            # Verificamos que el archivo no exista para no repetir descarga

            if not os.path.isfile(folder+nombre):
                print "Descargando " + nombre

                xy = row[9].split(" - ")
                x = int(xy[0])
                y = int(xy[1])

                # dimensiones del rectangulo representado

                minx = x - 1024*2
                maxx = x + 1024*2
                miny = y - 1024*2
                maxy = y + 1024*2

                # Pedimos la imagen al servidor WMS, 2048x2048 pixels

                response = wms.getmap(
                    layers=['OI.OrthoimageCoverage'],
                    srs='EPSG:25830',
                    styles=['Default'],
                    bbox=(minx,miny,maxx,maxy),
                    size=(2048,2048),
                    format='image/jpeg',
                    transparent=True,
                    queryable=True,
                    exceptions='application/vnd.ogc.se_inimage')

                # Almacenamos localmente la imagen con el nombre del embalse y anyo

                out = open(folder + nombre, 'wb')
                out.write(response.read())
                out.close()
            else:
                print nombre + " ya existe"

    rownum += 1

f.close()
