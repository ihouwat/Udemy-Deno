/* 
  - In Deno, you need to explicitly enter the type of an imported file
  - deno info <filename> will show you dependencies
  - You can use deno info with any ES6 import
*/
import { denode } from "./modules-export.js";
import "https://deno.land/std@0.113.0/examples/welcome.ts";

console.log(denode('node')); // will output 'deno'
console.log(denode('gibberish')); // will output 'gibberish'