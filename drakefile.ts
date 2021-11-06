import { desc, run, task, sh } from "https://deno.land/x/drake@v1.5.0/mod.ts";

/* 
  deno run -A Drakefile.ts hello
  Drake is a task runner that allows us to script our tasks
*/

desc("Minimal Drake task");
task("hello", [], async function() {
  console.log("Hello World!");
  await sh('deno run --allow-env deno-permissions.ts'); // shell script that takes care of commands run on any shell
});

run()