# ex-1
Contiene :
- Modelo de base de datos relacional (formato mysql workbench)
- Imagen PNG con modelo
- Archivo SQL con tablas, indices y FKS de modelo
- Archivo querys.txt que contiene consultas miscelaneas al modelo

# ex-2
Contiene:
- Ejercicio de ordenamiento / encontrar número en un arreglo
Para ejecutar basta con contar con una versión de Node16 o construir / correr imagen de contenedor en Docker. Ejemplo:

docker build -t ex-2 .
docker run ex-2

# ex-3
1. express-sqlite-api-agent
Contiene:
- Aplicación backend con API para obtener logs de aplicación de monitereo
- Aplicación agente encargada de poblar log de aplicación de monitoreo (la ejecución de esta aplicación por defecto se encuentra embebida en la aplicación de backend)

Para ejecutar la API/Agente es necesario contar con una versión de Node16 o construir / correr imagen de contenedor en Docker. Ejemplo:

docker build -t ex-3a .
docker run -p 3000:3000 ex-3a

2. frontend-app
Contiene:
- Aplicación frontend que se encarga de renderizar resultados de API backend para obtener log de aplicación de monitereo

Para ejecutar esta aplicación frontend:

- yarn install
- yarn dev

Esto nos montará una aplicación web en la siguiente url:

http://localhost:8080/log

Para levantar esta aplicación web es necesario tener previamente levantada la aplicación express-sqlite-api-agent