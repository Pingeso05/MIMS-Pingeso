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

#Generamos los datos para las tabla de joyas
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
                    valores_fila.append((celda.value).capitalize())
                i+=1

            readings.append(valores_fila)


#for elemento in readings:
#    print(elemento)

#Bloque para Locaciones
regiones = [
    "Región de Arica y Parinacota",
    "Región de Tarapacá",
    "Región de Antofagasta",
    "Región de Atacama",
    "Región de Coquimbo",
    "Región de Valparaíso",
    "Región Metropolitana de Santiago",
    "Región del Libertador General Bernardo O'Higgins",
    "Región del Maule",
    "Región de Ñuble",
    "Región del Biobío",
    "Región de La Araucanía",
    "Región de Los Ríos",
    "Región de Los Lagos",
    "Región de Aysén del General Carlos Ibáñez del Campo",
    "Región de Magallanes y de la Antártica Chilena"
]

comunas_por_region = [
    [],  # Región de Arica y Parinacota
    [],  # Región de Tarapacá
    [],  # Región de Antofagasta
    [],  # Región de Atacama
    [],  # Región de Coquimbo
    [],  # Región de Valparaíso
    [],  # Región Metropolitana de Santiago
    [],  # Región del Libertador General Bernardo O'Higgins
    [],  # Región del Maule
    [],  # Región de Ñuble
    [],  # Región del Biobío
    [],  # Región de La Araucanía
    [],  # Región de Los Ríos
    [],  # Región de Los Lagos
    [],  # Región de Aysén del General Carlos Ibáñez del Campo
    []   # Región de Magallanes y de la Antártica Chilena
]

comunas_por_region[0] = ["Arica", "Putre", "General Lagos"]
comunas_por_region[1] = ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
comunas_por_region[2] = ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama"]
comunas_por_region[3] = ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
comunas_por_region[4] = ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
comunas_por_region[6] = ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba","Independencia", "La Cisterna", "La Granja", "La Florida", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
comunas_por_region[7] = ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente"]
comunas_por_region[8] = ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael"]
comunas_por_region[9] = ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
comunas_por_region[10] = ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualañé", "Laja", "Lebu", "Los Álamos", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Ángeles"]
comunas_por_region[11] = ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol"]
comunas_por_region[12] = ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli"]
comunas_por_region[13] = ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"]
comunas_por_region[14] = ["Coihaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel"]
comunas_por_region[15] = ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica"]
#Creamos las tablas
regiones_table = ("CREATE TABLE IF NOT EXISTS regiones("+
                    "id int NOT NULL AUTO_INCREMENT, "+
                    "nombre varchar(255) NOT NULL, "+
                    "PRIMARY KEY (id));")
cursor.execute(regiones_table)

comunas_table = ("CREATE TABLE IF NOT EXISTS comunas("+
                    "id int NOT NULL AUTO_INCREMENT, "+
                    "nombre varchar(255) NOT NULL, "+
                    "id_region int NOT NULL, "+
                    "PRIMARY KEY (id));")
cursor.execute(comunas_table)
cursor.close()
database.commit()

cursor = database.cursor()
#limpiamos las tablas
query = "TRUNCATE TABLE mims.regiones"
cursor.execute(query)
query = "TRUNCATE TABLE mims.comunas"
cursor.execute(query)
query = "TRUNCATE TABLE mims.locacion"
cursor.execute(query)
query = "TRUNCATE TABLE mims.tipo_joya"
cursor.execute(query)
query = "TRUNCATE TABLE mims.joya"
cursor.execute(query)
query = "TRUNCATE TABLE mims.inventario"
cursor.execute(query)
cursor.close()
database.commit()



#bloque para regiones y comunas
#Poblamos la tabla region
cursor = database.cursor()
query = "INSERT INTO mims.regiones (nombre) VALUES (%s)"
for element in regiones:
    values = (element)
    cursor.execute(query, values)
cursor.close()
database.commit()

#Poblamos la tabla comuna
cursor = database.cursor()
query = "INSERT INTO mims.comunas (nombre, id_region) VALUES (%s, %s)"
for elemento in regiones:
    id = regiones.index(elemento)
    for comuna in comunas_por_region[id]:
        nombre = comuna
        values = (comuna, id)
        cursor.execute(query, values)
cursor.close()
database.commit()

#Generamos las locaciones
cursor = database.cursor()
query = "INSERT INTO mims.locacion(nombre, direccion, deleted, comuna, region) VALUES (%s, %s, FALSE, (SELECT id FROM mims.comunas WHERE nombre = %s), (SELECT id_region FROM mims.comunas WHERE nombre = %s))"
nombre = "Bodega Maipú"
direccion = "Av. Gabriel Gonzalez Videla #1928"
comuna = "Maipú"
val_query=(nombre, direccion, comuna, comuna)
cursor.execute(query, val_query)
cursor.close()
database.commit()

cursor = database.cursor()
query = "INSERT INTO mims.locacion(nombre, direccion, deleted, comuna, region) VALUES (%s, %s, FALSE, (SELECT id FROM mims.comunas WHERE nombre = %s), (SELECT id_region FROM mims.comunas WHERE nombre = %s))"
nombre = "Tienda Ñuñoa"
direccion = "Av. Itaila #1659"
comuna = "Ñuñoa"
val_query=(nombre, direccion, comuna, comuna)
cursor.execute(query, val_query)
cursor.close()
database.commit()

#comenzamos con las joyas

#Creamos los tipos de joyas
cursor = database.cursor()
query = "INSERT INTO mims.tipo_joya(nombre, material, deleted) VALUES ( %s, %s, FALSE)"
for element in malibu_tipo_joyas:
    name = element.capitalize()
    mat = "plata"
    values = (name, mat)
    cursor.execute(query, values)
cursor.close()
database.commit()

#Agregamos las joyas
cursor = database.cursor()
query = "INSERT INTO mims.joya(nombre, id_tipo_joya, deleted) VALUES ( %s, (SELECT id FROM mims.tipo_joya WHERE nombre = %s), FALSE)"
for valores in readings:
    nombre = valores[1]
    tipo_joya = valores[0]
    val_query = (nombre, tipo_joya)
    cursor.execute(query, val_query)
cursor.close()
database.commit()


#Agregamos el inventario
cursor = database.cursor()
for element in readings:
    print(element)
query = "INSERT INTO mims.inventario(cantidad, precio_venta, id_joya, id_locacion, deleted) VALUES ( %s, %s, (SELECT id FROM mims.joya WHERE nombre = %s), 1,(SELECT id_tipo_joya FROM mims.joya WHERE nombre = %s), FALSE)"
for elemento in readings:
    cantidad = elemento[2]
    precio_venta = elemento[4]
    nombre = elemento[1]
    val_query=(cantidad, precio_venta, nombre, nombre)
    cursor.execute(query, val_query)
cursor.close()
database.commit()
#fin

database.close()
print("Se han cargado los datos de manera correcta.")
