// module to read paths
import { join } from 'https://deno.land/std/path/mod.ts';

async function readFileAsync() {
  const path = join('text-files', 'hello.txt'); // join takes a sequence of paths and resolves them

  const data = await Deno.readTextFile(path);
  console.log(data);
}

const readDirectory = async () => {
  for await (const dirEntry of Deno.readDir('.')) {
    console.log(dirEntry.name);
  }
}

await readFileAsync();
await readDirectory();