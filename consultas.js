/* 
  Ejercitación: Consultas Raw en MongoDB

  Escribe en cada variable el objeto JSON/BSON de búsqueda, modificación o ordenamiento
  que utilizarías en MongoDB Compass o Atlas.
  
  Ejemplo: Si te piden buscar el equipo "Argentina", escribirías:
  const buscarArgentina = { equipo: "Argentina" };
*/

// 1. Búsqueda exacta: Escribe el filtro para encontrar a los equipos del continente "Europa".
const buscarEuropa = {
  continente: "Europa"
};

// 2. Búsqueda parcial ($in): Filtra los equipos que pertenezcan al grupo "C" o "F".
const buscarGruposCOF = {
  grupo: { $in: ["C", "F"] }
};

// 3. Búsqueda parcial ($regex): Filtra los equipos cuyo técnico contenga la palabra "Lionel" (sin importar mayúsculas/minúsculas).
const buscarTecnicoLionel = {
  tecnico: { $regex: "Lionel", $options: "i" }
};

// 4. Búsqueda con operador $gt: Filtra los equipos que tengan estrictamente más de 1 "campeonatos_mundiales".
const buscarMasDeUnMundial = {
  campeonatos_mundiales: { $gt: 1 }
};

// 5. Búsqueda en subdocumentos ($gte): Filtra los equipos donde el rendimiento tenga "goles_a_favor" mayor o igual a 15.
const buscarGolesAFavor = {
  "rendimiento.goles_a_favor": { $gte: 15 }
};

// 6. Búsqueda en Arreglos: Filtra los equipos que tengan al menos un jugador que juegue en el "Paris Saint-Germain".
const buscarJugadoresPSG = {
  'jugadores.club_actual':'Paris Saint-Germain'
};

// 7. Operadores Lógicos ($or): Filtra equipos que pertenezcan al grupo "F" O que sean del continente "Sudamérica".
const buscarGrupoFOAmerica = {
  $or: [
    { grupo: "F" },
    { continente: "Sudamérica" }
  ]
};

// 8. Búsqueda exacta (Rivales de Argentina): Filtra los equipos que pertenezcan al grupo "J".
const buscarGrupoJ = {
  grupo: "J"
};

// 9. Ordenamiento (Sort): Escribe el objeto para ordenar los resultados por "rendimiento.ganados" de forma descendente (del mayor al menor).
const ordenarPorGanados = {
  "rendimiento.ganados": -1
};

// 10. Modificación ($set): Escribe el OPERADOR de actualización necesario para cambiar el nombre del "tecnico" a "Lionel Scaloni (Campeón)". 
// Nota: Solo el operador, no incluyas el filtro.
const actualizarTecnicoCampeon = {
  $set: { tecnico: "Lionel Scaloni (Campeón)" }
};

module.exports = {
  buscarEuropa,
  buscarGruposCOF,
  buscarTecnicoLionel,
  buscarMasDeUnMundial,
  buscarGolesAFavor,
  buscarJugadoresPSG,
  buscarGrupoFOAmerica,
  buscarGrupoJ,
  ordenarPorGanados,
  actualizarTecnicoCampeon
};
