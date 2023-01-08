# Web Investigación

## Introducción

Proyecto final de Base de Datos Avanzadas. Este proyecto es el trabajo final para la asignatura de Base de Datos Avanzadas, el cual se centra en la creación un sistema de gestión de grupos de investigación que sea usado por los investigadores de una empresa para facilitar tanto la gestión de proyectos de investigación conjuntos como la publicación de artículos por parte de ellos.

## :hammer:Funcionalidades del proyecto

- Lectura y acceso a artículos de investigación
- Creación de nuevos artículos de investigación
- Edición de artículos de investigación
- Borrado de artículos de investigación

## Tecnologías utilizadas

- Node.js
- Express
- React
- TailwindCSS
- Oracle Database

## Instalación

### Backend

Este proyecto requiere [Node.js](https://nodejs.org/) v10+ para funcionar.

Se deben instalar las dependencias de producto y dependencias de desarrollo (mirar en package.json) e iniciar el servidor.

```sh
cd backend
npm i
npm run dev
```

##### Variables de entorno

Las variables de entorno son variables externas a la aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Este proyecto trabaja con ellas y deben estar en el archivo ".env", por lo que se deberá crear un archivo con esa extensión y asignar todas las variables necesarias para el proyecto de acuerdo a la persona que esté utilizando el código.

Para facilitarlo el proyecto cuenta con un archivo ".env.example" el cual contiene todas las variables de entorno necesarias y la sintaxis para asignar cada valor a las mismas.

### Frontend

Para iniciar el frontend:

```sh
cd frontend
npm i
npm run dev
```
