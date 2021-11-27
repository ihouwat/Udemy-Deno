/* 
  Deno includes:

  1. The test runner in the CLI (ie. 'deno test')
  2. Assertions in the standard library
  3. Built-in text fixtures with Deno.test()
*/

import { assertEquals, assertNotEquals } from '../test_deps.ts';
import { filterHabitablePlanets } from './planets.ts';

const HABITABLE_PLANET = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1',
  koi_smass: '1',
};

const NOT_CONFIRMED= {
  koi_disposition: 'FALSE POSITIVE',
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1.5',
  koi_srad: '1',
  koi_smass: '1',
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1.01',
  koi_smass: '1',
};

const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1',
  koi_smass: '1.04',
};

Deno.test('filter only habitable planets', () => {
  const filtered = filterHabitablePlanets([ HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_RADIUS,
    TOO_LARGE_SOLAR_MASS
  ]);
  assertEquals(filtered, [HABITABLE_PLANET]);
});


  // TESTING BASICS

  // Writing tests the long way
  Deno.test({
    name: 'long example test',
    ignore: Deno.build.os === 'windows', // to ignore a test
    fn() {
      assertEquals('deno', 'deno');
      assertNotEquals({
        runtime: 'deno'
      }, {
        runtime: 'node'
      });
    } 
  });

  // Deno shorthand for writing tests
  Deno.test('shorthand example test', () => {
    assertEquals('deno', 'deno');
    assertNotEquals({
      runtime: 'deno'
    }, {
      runtime: 'node'
    });
  });

  Deno.test({
    name: 'ops leak', // test runner ends before an async operation has ended
    sanitizeOps: false, // checks for async operations
    fn() {
      setTimeout(console.log, 10000);
    }
  });

  Deno.test({
    name: 'resource leak', // opening a file without closing it
    sanitizeResources: false, // checks the resource table
    async fn() {
      await Deno.open('./models/planets.ts')
    }
  });