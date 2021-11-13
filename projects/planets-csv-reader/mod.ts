import { join } from 'https://deno.land/std/path/mod.ts';
import { BufReader } from 'https://deno.land/std@0.114.0/io/buffer.ts';
import { parse } from 'https://deno.land/std/encoding/csv.ts';

import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Planet {
  [key: string]: string;
}

async function loadPlanetData(): Promise<Planet[]> {
  const path = join('.', 'kepler_exoplanets_nasa.csv');

  // Load and read file
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: '#',
  });

  // Always close files
  Deno.close(file.rid);

  // Filter the CSV for planets based on the properties below
  const planets = (result as Planet[]).filter(planet => {
    const planetaryRadius = Number(planet['koi_prad']);
    const stellarMass = Number(planet['koi_smass']);
    const stellarRadius = Number(planet['koi_srad']);

    return planet['koi_disposition'] === 'CONFIRMED'
      && planetaryRadius > 0.5 && planetaryRadius < 1.5
      && stellarMass > 0.78 && stellarMass < 1.04
      && stellarRadius > 0.99 && stellarRadius < 1.01;
  });

  // Return a subset of the data available for each planet
  return planets.map(planet => {
    return _.pick(planet, [ // lodash utility function
      'koi_prad',
      'koi_smass',
      'koi_srad',
      'kepler_name', // name of planet
      'koi_count', // number of planets in the planet's system
      'koi_steff' // stellar temperature
    ]);
  });
}

const newEarths = await loadPlanetData();

for (const planets of newEarths) { 
  console.log(planets);}
console.log(`${newEarths.length} habitable planets found!`);