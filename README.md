# **Intuit Challenge - App del Clima**

Este proyecto es una solución al challenge de **frontend** propuesto, que consiste en crear una aplicación para mostrar datos del clima utilizando la API de [MetaWeather](https://www.metaweather.com/api/). <br>
Dado que la API no se encuentra disponible en el momento de la evaluación, se utilizó la API de [WeatherAPI](https://www.weatherapi.com/) para obtener los datos necesarios.

La aplicación fue desarrollada utilizando **React** y **TypeScript** sobre **Next.js**. <br>
Para el manejo de estilos se utilizaron **CSS Modules**. <br>

Demo: [https://intuit-challenge-ianmuler.vercel.app/](https://intuit-challenge-ianmuler.vercel.app/)

## Índice

- [Características](#características)
  - [Buscador de Ciudades](#buscador-de-ciudades)
  - [Datos del Clima](#datos-del-clima)
  - [Búsqueda Histórica](#búsqueda-histórica)
- [Mejoras y Extras](#mejoras-y-extras)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)

  
## **Características**

### **Buscador de Ciudades**

- Se implementó un buscador en forma de input de texto para buscar ciudades.
- A medida que los usuarios escriben, se realiza una búsqueda y se muestran los resultados en tiempo real.
- Los resultados de la búsqueda se presentan en un menú desplegable debajo del input.

    #### Interacción:
    - Los usuarios pueden navegar por los resultados de la búsqueda utilizando las teclas de flecha arriba y abajo y seleccionar un resultado con la tecla Enter. O bien, pueden hacer click en un resultado para seleccionarlo.

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
<img src="https://i.imgur.com/Z7kFoI6.gif" width="400" />
</div>


### **Datos del Clima**

Una vez seleccionada una ciudad, la aplicación consulta y muestra:

- Temperatura máxima y mínima del día actual.
- Humedad del día actual.
- Probabilidad de lluvias (predictability) del día actual.
- Datos del clima para los próximos 5 días.

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
<img src="https://i.imgur.com/91OAPjO.png" width="600" />
</div>

### **Búsqueda Histórica**

- Se añadió un selector de fechas que permite al usuario buscar datos históricos del clima.
- Al realizar una búsqueda histórica, se toma solamente el primer resultado obtenido y se muestran los datos relevantes en pantalla.

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
<img src="https://i.imgur.com/uSpVVTZ.gif" width="400" />
</div>


 
## **Mejoras y Extras**

- Queda por implementar un sistema de caché para almacenar los resultados de las búsquedas y evitar realizar consultas innecesarias a la API.

## **Cómo correr el proyecto**

1. Clona el repositorio.
2. Instala las dependencias con **`yarn install`**.
3. Corre el proyecto con **`yarn dev`**.
