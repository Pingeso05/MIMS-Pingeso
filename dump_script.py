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

regiones_table = ("CREATE TABLE IF NOT EXISTS regiones("+
                    "id int NOT NULL AUTO_INCREMENT, "+
                    "nombre varchar(255) NOT NULL, "+
                    "PRIMARY KEY (id));")

cursor.execute(regiones_table)
cursor.close()
database.commit()
#comenzamos nuevamente
cursor = database.cursor()
comunas_table = ("CREATE TABLE IF NOT EXISTS comunas("+
                    "id int NOT NULL AUTO_INCREMENT, "+
                    "nombre varchar(255) NOT NULL, "+
                    "id_region int NOT NULL, "+
                    "PRIMARY KEY (id));")
cursor.execute(comunas_table)
cursor.close()
database.commit()
#comenzamos nuevamente
cursor = database.cursor()

query = "INSERT INTO mims.regiones (nombre) VALUES (%s)"
#query2 = "INSERT INTO mims.comunas (nombre, id_region) VALUES (%s, (SELECT id FROM))"
for element in regiones:
    values = (element)
    cursor.execute(query, values)
cursor.close()
database.commit()
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
cursor = database.cursor()
   
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

cursor = database.cursor()
query = "INSERT INTO mims.locacion(nombre, direccion, deleted, created_at, created_by, updated_at, updated_by) VALUES (%s, %s, FALSE, %s, %s, %s, %s)"
nombre = "Bodega Maipu"
direccion = "Av. Gabriel Gonzalez Videla #1928"
val_query=(nombre, direccion, created_at, created_by, updated_at, updated_by)
cursor.execute(query, val_query)
cursor.close()
database.commit()

database.close()
print("finished")