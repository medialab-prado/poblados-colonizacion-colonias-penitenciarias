import urllib2
import sys, csv
from bs4 import BeautifulSoup

# Abre un csv de escritura para volcar los datos
f = open('embalses-snczi-2000000.csv','w')
writer = csv.writer(f)

names = ["id", "Nombre", "Otro nombre", "Fecha", "Anyo", "Rio", "Municipio", "Cuenca", "Provincia", "x", "y", "Tipos"]
writer.writerow([unicode(s).encode("utf-8") for s in names])

# Vamos a iterar desde 1 hasta 1226
for n in range(2024057, 2100000):
#for n in range(1,30):

    # Descarga el html de la web de SEPREM
    url = 'http://sig.mapama.es/93/ClienteWS/snczi/default.aspx?nombre=PRESA&claves=DGAGUA.PRESAS.CODPRESA&valores='+"%07d" % n
    print url;
    html = urllib2.urlopen(url).read()
    soup = BeautifulSoup(html,'lxml')
    h2 = soup.find("h2")
    if h2:
        data = ["---", "---","---","---","---","---","---","---","---","---","---","---"]
        print h2
        data[0] = n
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
                dmy = data[2].split("-")
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
        print data
        writer.writerow([unicode(s).encode("utf-8") for s in data])
    else:
        print "nada"

# Cerramos embalses.csv
f.close()
