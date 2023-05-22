#Script para reaizar el dump de la base de datos en excel
#Se requieren las librerias mysql-connector-python y xlrd

from openpyxl import load_workbook as lw
import pymysql as dbc
import pandas as pd

#Conectamos a la base de datos
database = dbc.connect(user='root', password='password', host='localhost', database='mims')
cursor = database.cursor()

#creamos una tabla por si no existe
#tipo_joya_table = ("CREATE TABLE IF NOT EXISTS tipo_joya("+
#                    "id int NOT NULL AUTO_INCREMENT, "+
#                    "nombre varchar(255) NOT NULL, "+
#                    "material varchar(255) NOT NULL, "+
#                    "deleted boolean NOT NULL default 0, PRIMARY KEY (id));")
#
#cursor.execute(tipo_joya_table)
#para los tipos de joyas, usaremos los nombres de las hojas
#abrimos el archivo
malibu_db = lw('STOCK MALIBU.xlsx')
malibu_tipo_joyas = malibu_db.sheetnames
#print(malibu_tipo_joyas)
query = "INSERT INTO mims.tipo_joya(nombre, material, deleted) VALUES ( %s, %s, FALSE)"
for element in malibu_tipo_joyas:
    print(element)
    name = element.capitalize()
    mat = "plata"
    values = (name, mat)
    cursor.execute(query, values)

cursor.close()
database.commit()
database.close()
print("finished")
