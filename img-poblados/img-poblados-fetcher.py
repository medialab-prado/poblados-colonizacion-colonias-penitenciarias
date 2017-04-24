import csv
import os.path
from owslib.wms import WebMapService

wms = [WebMapService('http://fototeca.cnig.es/wms/fototeca.dll', version='1.1.1'),
        WebMapService('http://fototeca.cnig.es/wms/fototeca.dll', version='1.1.1'),
        WebMapService('http://www.ign.es/wms-inspire/pnoa-ma', version='1.1.1')]


f = open('poblados.csv','rU')
reader = csv.reader(f)

rownum = 0
for row in reader:
    if rownum > 0:
        name = row[3]               # nombre del embalse
        year = row[6]
        id = row[2]
        if year:
            name = "".join([c for c in name if c.isalpha() or c.isdigit() or c==' ']).rstrip()
            nombre = id + ".jpeg"
            folders = ['1945/', '1956/', '2014/']
            vuelos = ["americano_serie_a", "americano_1956_57", "OI.OrthoimageCoverage"]
            styles = ['SGD_StereoModel::ShowAnaglyphicOff|SGD_StereoModel::OrthoOnTheFlyOn',
                    'SGD_StereoModel::ShowAnaglyphicOff|SGD_StereoModel::OrthoOnTheFlyOn',
                    'Default']
            for i in range(3):

                # Verificamos que el archivo no exista para no repetir descarga

                if not os.path.isfile(folders[i]+nombre):
                    print "Descargando " + folders[i] + name

                    x = int(float(row[0]))
                    y = int(float(row[1]))

                    # dimensiones del rectangulo representado

                    mlado = 1500
                    minx = x - mlado
                    maxx = x + mlado
                    miny = y - mlado
                    maxy = y + mlado

                    # Pedimos la imagen al servidor WMS, 2048x2048 pixels
                    response = wms[i].getmap(
                        layers=[vuelos[i]],
                        srs='EPSG:25830',
                        styles=[styles[i]],
                        bbox=(minx,miny,maxx,maxy),
                        size=(2048,2048),
                        format='image/jpeg',
                        transparent=True,
                        queryable=True,
                        exceptions='application/vnd.ogc.se_inimage')

                    # Almacenamos localmente la imagen con el nombre del embalse y anyo

                    out = open(folders[i] + nombre, 'wb')
                    out.write(response.read())
                    out.close()
                else:
                    print nombre + " ya existe"

    rownum += 1

f.close()
