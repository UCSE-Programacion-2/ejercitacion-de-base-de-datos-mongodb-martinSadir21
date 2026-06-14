const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Importamos las consultas del alumno
const {
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
} = require('../consultas');

let mongoServer;
let connection;
let db;
let equiposCollection;

beforeAll(async () => {
  // Iniciar la BD en memoria
  mongoServer = await MongoMemoryServer.create();
  connection = await MongoClient.connect(mongoServer.getUri());
  db = connection.db('MundialDB');
  equiposCollection = db.collection('equipos');

  // Leer y cargar la semilla desde world-cup.json
  const dataPath = path.join(__dirname, '../world-cup.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const equipos = JSON.parse(rawData);

  await equiposCollection.insertMany(equipos);
});

afterAll(async () => {
  if (connection) await connection.close();
  if (mongoServer) await mongoServer.stop();
});

describe('Ejercitación MongoDB - Búsquedas y Manipulación', () => {

  it('1. Búsqueda exacta: buscarEuropa', async () => {
    expect(buscarEuropa).toBeDefined();
    expect(Object.keys(buscarEuropa).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarEuropa).toArray();
    
    expect(resultados).toHaveLength(16);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Francia');
    expect(nombres).toContain('Italia');
  });

  it('2. Búsqueda parcial $in: buscarGruposCOF', async () => {
    expect(buscarGruposCOF).toBeDefined();
    expect(Object.keys(buscarGruposCOF).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarGruposCOF).toArray();
    
    expect(resultados).toHaveLength(8);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Marruecos');
  });

  it('3. Búsqueda parcial $regex: buscarTecnicoLionel', async () => {
    expect(buscarTecnicoLionel).toBeDefined();
    expect(Object.keys(buscarTecnicoLionel).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarTecnicoLionel).toArray();
    
    expect(resultados).toHaveLength(1);
    expect(resultados[0].equipo).toBe('Argentina');
  });

  it('4. Búsqueda $gt: buscarMasDeUnMundial', async () => {
    expect(buscarMasDeUnMundial).toBeDefined();
    expect(Object.keys(buscarMasDeUnMundial).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarMasDeUnMundial).toArray();
    
    expect(resultados).toHaveLength(6);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Argentina');
    expect(nombres).toContain('Francia');
    expect(nombres).toContain('Brasil');
  });

  it('5. Búsqueda anidada $gte: buscarGolesAFavor', async () => {
    expect(buscarGolesAFavor).toBeDefined();
    expect(Object.keys(buscarGolesAFavor).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarGolesAFavor).toArray();
    
    expect(resultados).toHaveLength(2);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Argentina');
    expect(nombres).toContain('Francia');
  });

  it('6. Búsqueda en arrays: buscarJugadoresPSG', async () => {
    expect(buscarJugadoresPSG).toBeDefined();
    expect(Object.keys(buscarJugadoresPSG).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarJugadoresPSG).toArray();
    
    expect(resultados).toHaveLength(5);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Argentina');
    expect(nombres).toContain('Francia');
  });

  it('7. Operadores lógicos $or: buscarGrupoFOAmerica', async () => {
    expect(buscarGrupoFOAmerica).toBeDefined();
    expect(Object.keys(buscarGrupoFOAmerica).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarGrupoFOAmerica).toArray();
    
    // Grupo F + Sudamérica = 11 equipos
    expect(resultados).toHaveLength(11);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Argentina');
    expect(nombres).toContain('Brasil');
  });

  it('8. Búsqueda exacta: buscarGrupoJ', async () => {
    expect(buscarGrupoJ).toBeDefined();
    expect(Object.keys(buscarGrupoJ).length).toBeGreaterThan(0);

    const resultados = await equiposCollection.find(buscarGrupoJ).toArray();
    
    expect(resultados).toHaveLength(4);
    const nombres = resultados.map(r => r.equipo);
    expect(nombres).toContain('Argentina');
  });

  it('9. Ordenamiento: ordenarPorGanados', async () => {
    expect(ordenarPorGanados).toBeDefined();
    expect(Object.keys(ordenarPorGanados).length).toBeGreaterThan(0);

    // Ejecutamos find sin filtro y aplicamos el sort del alumno
    const resultados = await equiposCollection.find({}).sort(ordenarPorGanados).toArray();
    
    expect(resultados).toHaveLength(48);
    // El mayor ganador es Francia (5), luego Argentina (4), Marruecos (3), Croacia (2)
    expect(resultados[0].equipo).toBe('Francia');
    expect(resultados[1].equipo).toBe('Argentina');
    expect(resultados[2].equipo).toBe('Marruecos');
    expect(resultados[3].equipo).toBe('Croacia');
  });

  it('10. Actualización $set: actualizarTecnicoCampeon', async () => {
    expect(actualizarTecnicoCampeon).toBeDefined();
    expect(Object.keys(actualizarTecnicoCampeon).length).toBeGreaterThan(0);

    // Aplicamos el objeto del alumno sobre el documento de Argentina
    await equiposCollection.updateOne({ equipo: "Argentina" }, actualizarTecnicoCampeon);
    
    const argentina = await equiposCollection.findOne({ equipo: "Argentina" });
    expect(argentina.tecnico).toBe('Lionel Scaloni (Campeón)');
  });

});
