[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/aZJ12ih5)
# Ejercitación: Consultas en MongoDB

En este repositorio encontrarás una serie de ejercicios prácticos para aplicar los conceptos de **búsquedas, operadores y manipulación de datos** vistos en la clase de MongoDB.

## 🛠 Entorno de Trabajo Local (Para probar manualmente)

Para esta actividad, **no vas a programar código Node.js activo**. Tu tarea será **escribir exclusivamente los objetos BSON/JSON** correspondientes a las consultas de la base de datos, en el archivo `consultas.js`. 

Para poder probar tus consultas mientras trabajas, deberás hacerlo directamente en MongoDB:

1. Inicia sesión en tu cluster de **MongoDB Atlas** o abre **MongoDB Compass**.
2. Crea una nueva base de datos llamada `MundialDB` y una colección llamada `equipos`.
3. Importa a esta colección los datos del archivo **`world-cup.json`** provisto en este repositorio.
4. Escribe tus objetos de búsqueda (`{ campo: "valor" }`) en la barra de consultas (Filter) de Compass/Atlas para verificar que arrojen los resultados esperados.
5. Una vez verificada la sintaxis y el resultado, **copia ese objeto** en el archivo `consultas.js` de este proyecto, en la variable correspondiente.

## ✅ ¿Cómo evaluar tu trabajo automáticamente?

Además de probar en Compass/Atlas, la cátedra te brinda un mecanismo de evaluación automática para que sepas en el momento si resolviste bien los ejercicios.

1. Abre tu terminal en la carpeta de este repositorio.
2. Instala las dependencias del autoevaluador:
   ```bash
   npm install
   ```
3. Corre el evaluador:
   ```bash
   npm test
   ```

El autoevaluador (*Jest*) se encargará de levantar temporalmente una base de datos local en tu memoria (sin que tengas que instalar nada), importará el `world-cup.json` por ti, y aplicará sobre esa base los objetos JSON que tú dejaste en `consultas.js`. Si funciona bien, verás todas las pruebas en **VERDE**.

## 📝 Reglas

- Las consultas en `consultas.js` deben ser objetos válidos de JavaScript/MongoDB.
- No modifiques el archivo de los tests (`tests/consultas.test.js`).
- Cada `push` que hagas será evaluado también en GitHub Classroom mediante *Actions*.
