import * as log from 'https://deno.land/std/log/mod.ts';
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// Deno's built-in logger is powerful. This is how to set it up:
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG'),
  },
  loggers: {
    default: {
      level: 'DEBUG',
      handlers: ['console']
    }
  }
});

interface Launch {
  flightNumber: number;
  mission: string;
  rocketName: string;
  customers: Array<string>;
}

const launches = new Map<number, Launch>();

export async function downloadLaunchData() {
  log.info('Downloading launch data...');
  const response = await fetch('https://api.spacexdata.com/v3/launches',{
    method: 'GET'
  });

  if(!response.ok) {
    log.warning('Problem downlading launch data.');
    throw new Error('Launch data download failed.');
  }

  const launchData = await response.json();
  for(const launch of launchData) {
    const payloads = launch['rocket']['second_stage']['payloads'];
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload['customers'];
    });

    const flightData: Launch = {
      flightNumber: launch['flight_number'],
      mission: launch['mission_name'], 
      rocketName: launch['rocket']['rocket_name'],
      customers: customers
    };

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }
}

async function postRequest() {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      'name': 'Elon Musk',
      'job': 'billionaire'
    })
  })

  console.log(await response.json());
}

/* 
  import.meta is defined in modules and provides metadata.
  'main' tells us if the module is a standalone or if it is an import
*/
if(import.meta.main) {
  await downloadLaunchData();
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`)
}
await postRequest();