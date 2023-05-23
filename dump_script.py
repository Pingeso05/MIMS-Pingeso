#Script para reaizar el dump de la base de datos en excel
#Se requieren las librerias mysql-connector-python y xlrd

from openpyxl import load_workbook as lw
import pymysql as dbc
import datetime as dt

def is_float(string):
    if string.replace(".", "").isnumeric():
        return True
    else:
        return False

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

readings = []
for elemento in malibu_tipo_joyas:
    hoja = malibu_db[elemento]
    numero_fila = 1 
    for fila in hoja:
        if numero_fila == 1 or fila[0].value is None or fila[0].value == '':
            #print('primera o blanca')
            numero_fila +=1
        else:   
            valores_fila = [elemento]
            i = 0
            for celda in fila:
                if(i != 0):
                    if is_float(str(celda.value)):
                        valores_fila.append(int(celda.value))
                    else:
                        valores_fila.append(0)
                else:
                    valores_fila.append(celda.value)
                i+=1

            readings.append(valores_fila)

#print(malibu_tipo_joyas)
created_at = dt.date.today()
created_by = 1
updated_at = dt.date.today()
updated_by = 1


#for elemento in readings:
#    print(elemento)
"""
query = "INSERT INTO mims.tipo_joya(nombre, material, deleted, created_at, created_by, updated_at, updated_by) VALUES ( %s, %s, FALSE, %s, %s, %s, %s)"
for element in malibu_tipo_joyas:
    #print(element)
    name = element.capitalize()
    mat = "plata"
    values = (name, mat, created_at, created_by, updated_at, updated_by)
    cursor.execute(query, values)

#cerramos el cursor
cursor.close()
#comitteamos los cambios
database.commit()
#comenzamos nuevamente
cursor = database.cursor()

query = "INSERT INTO mims.joya(nombre, id_tipo_joya, deleted, created_at, created_by, updated_at, updated_by) VALUES ( %s, (SELECT id FROM mims.tipo_joya WHERE nombre = %s), FALSE, %s, %s, %s, %s)"
for valores in readings:
    nombre = valores[1]
    tipo_joya = valores[0]
    val_query = (nombre, tipo_joya, created_at, created_by, updated_at, updated_by)
    cursor.execute(query, val_query)

    
#cerramos el cursor
cursor.close()
#comitteamos los cambios
database.commit()
#comenzamos nuevamente
cursor = database.cursor()

####guardar inventario como tal
for element in readings:
    print(element)
query = "INSERT INTO mims.inventario(cantidad, precio_costo, precio_venta, id_joya, id_locacion,  id_tipo_joya, deleted, created_at, created_by, updated_at, updated_by) VALUES ( %s, %s, %s, (SELECT id FROM mims.joya WHERE nombre = %s), 1,(SELECT id_tipo_joya FROM mims.joya WHERE nombre = %s), FALSE, %s, %s, %s, %s)"
for elemento in readings:
    cantidad = elemento[2]
    precio_costo = elemento[3]
    precio_venta = elemento[4]
    nombre = elemento[1]
    val_query=(cantidad, precio_costo, precio_venta, nombre, nombre, created_at, created_by, updated_at, updated_by)
    cursor.execute(query, val_query)

cursor.close()
database.commit()
"""


query = "INSERT INTO mims.locacion(nombre, direccion, deleted, created_at, created_by, updated_at, updated_by) VALUES (%s, %s, FALSE, %s, %s, %s, %s)"
nombre = "Bodega Maipu"
direccion = "Av. Gabriel Gonzalez Videla #1928"
val_query=(nombre, direccion, created_at, created_by, updated_at, updated_by)
cursor.execute(query, val_query)
cursor.close()
database.commit()

database.close()
print("finished")