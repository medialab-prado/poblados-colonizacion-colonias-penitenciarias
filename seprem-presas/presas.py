import urllib2
import sys, csv
from bs4 import BeautifulSoup

# Abre un csv de escritura para volcar los datos
f = open('embalses.csv','w')
writer = csv.writer(f)

# Vamos a iterar desde 1 hasta 1226
for n in range(1,1227):
#for n in range(1,30):

    # Descarga el html de la web de SEPREM
    url = 'http://www.seprem.es/ficha.php?idpresa='+str(n)
    html = urllib2.urlopen(url).read()
    soup = BeautifulSoup(html,'lxml')

    # Extrae la tabla "ftable" del html
    trs = soup.find("table", attrs={"id": "fpresa"}).findAll("tr")

    # Extrae los datos de los td y los introduce en dos listas
    names = []
    datas = []

    # Tenemos en cuenta las dos columnas de datos
    cta = 0
    for tr in trs:
        tds = tr.findAll("td")
        if len(tds) < 4:
            continue
        cta += 1
        name = tds[0].text.strip()
        data = tds[1].text.strip()
        if name:
            if cta == 11: # separamos coordenadas en X e Y
                if n == 1:
                    names.append("X utm 30")
                    names.append("Y utm 30")
                xy = data.split(" - ")
                datas.append(xy[0])
                datas.append(xy[1])
            else:
                if n == 1:
                    names.append(name)
                datas.append(data)

    for tr in trs:
        tds = tr.findAll("td")
        if len(tds) < 4:
            continue
        cta += 1
        name = tds[2].text.strip()
        data = tds[3].text.strip()
        if name:
            if n == 1:
                names.append(name)
            datas.append(data)

    # Escribimos encabezados
    if n == 1:
       writer.writerow([unicode(s).encode("utf-8") for s in names])

    # Escribimos datos
    writer.writerow([unicode(s).encode("utf-8") for s in datas])
    print " ".join(datas)

# Cerramos embalses.csv
f.close()
