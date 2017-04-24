import sys, csv

# Abre el csv de embalses totales
f = open('embalses.csv','r')
reader = csv.reader(f)

# Abre el csv de escritura para volcar solo los filtrados
fout = open('embalses-riego-dictadura.csv', 'w')
writer = csv.writer(fout)

# filtros
rownum = 0
total = 0
totriego = 0

for row in reader:
    if rownum > 0:
        year = row[7].split("-")[2]
        if year:
            year = int(year)
            if year > 1938 and year < 1976:             # filtro de anyo
                total += 1
                if row[10] and "Riego" in row[11]:      # filtro de Riego
                    print str(year) + " " + row[1]
                    writer.writerow( row )
                    totriego += 1
    else:
        writer.writerow( row )                          # escribe el header
    rownum += 1

# 548 embalses inaugurados durante la dictadura
print "Total embalses inaugurados durante la dictadura: " + str(total)
# 188 de ellos de riego
print "Total embalses riego inaugurados durante la dictadura: " + str(totriego)

f.close()
fout.close()
