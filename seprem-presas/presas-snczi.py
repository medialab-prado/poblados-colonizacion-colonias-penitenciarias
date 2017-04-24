import urllib2
import sys, csv
from bs4 import BeautifulSoup
import string

printable = set(string.printable)

# Abre un csv de lectura para leer los datos
f = open('embalses.csv','r')
reader = csv.reader(f)

# Abre un csv de escritura para volcar los datos
f2 = open('embalses-snczi.csv','w')
writer = csv.writer(f2)

names = ["codpresa", "Nombre", "Otro nombre", "Fecha", "Anyo", "Rio", "Municipio", "Cuenca", "Provincia", "x", "y", "Tipos"]
writer.writerow([unicode(s).encode("utf-8") for s in names])

# url base para query WMS GetFeatureInfo 1x1:
baseurl = "http://wms.mapama.es/sig/Agua/Presas/wms.aspx"
params = "?version=1.1.1&request=GetFeatureInfo&layers=Presas&styles=default&SRS=EPSG:32630&width=1&height=1&info_format=text/plain&X=0&Y=0&query_layers=Presas&startIndex=0&bbox="

rownum = 0
for row in reader:
    if rownum > 0:
        nombre = row[1]
        year = row[7].split("-")[2]

        # Filtro Franco
        if year:
            year = int(year)
            if year > 1938 and year < 1974:

                x = int(row[9])
                y = int(row[10])

                txt = ""
                d = 0;
                while len(txt) < 10:
                    d += 100
                    xmin = str(x - d)
                    ymin = str(y - d)
                    xmax = str(x + d)
                    ymax = str(y + d)

                    url = baseurl + params + xmin + "," + ymin + "," + xmax + "," + ymax
                    txt = urllib2.urlopen(url).read()
                    print len(txt)

            #        print "BUSQUEDA"
            #        print url

                datos = txt.split(";")
                codigo = datos[12]

                # Descargamos ficha
                ficha = "http://sig.mapama.es/93/ClienteWS/snczi/default.aspx?nombre=PRESA&claves=DGAGUA.PRESAS.CODPRESA&valores="+codigo
                html = urllib2.urlopen(ficha).read()

        #        print "FICHA"
        #        print ficha

                soup = BeautifulSoup(html,'lxml')
                h2 = soup.find("h2")
                if h2:
                    data = ["---", "---","---","---","---","---","---","---","---","---","---","---","---"]
                    print h2
                    data[0] = codigo
                    trs = soup.find("table").findAll("tr", attrs={"class": "alt"})
                    for tr in trs:
                        th = tr.find("th").text.strip()
                        td = tr.find("td")
                        if "Nombre de la presa" in th:
                            data[1] = td.text.strip()
                        if "Otro Nombre" in th:
                            data[2] = td.text.strip()
                        if "Fecha de finaliza" in th:
                            data[3] = td.text.strip()
                            dmy = data[3].split("-")
                            data[4] = dmy[2]
                        if "en el que se encuentra la presa" in th:
                            data[5] = td.text.strip()
                        if "Municipio" in th:
                            data[6] = td.text.strip()
                        if "Cuenca hidro" in th:
                            data[7] = td.text.strip()
                        if "Provincia" in th:
                            data[8] = td.text.strip()
                        if "Coordenadas" in th:
                            coords = td.text.strip()
                            xy = coords.split(" - ")
                            data[9] = xy[0]
                            data[10] = xy[1]
                        if "Tipos" in th:
                            data[11] = td.text.strip()
                    nombre = filter(lambda x: x in printable, nombre)                            
                    data[12] = nombre

                    if "Riego" in data[11]:
                        print "DATOS"
                        print nombre
                        print data[1]
                        writer.writerow([unicode(s).encode("utf-8") for s in data])

                else:
                    print "error"
                    writer.writerow([x,y])
    rownum += 1
