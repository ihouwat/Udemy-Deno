/* 
  CLI command: deno install --allow-env deno-permissions.ts
  compiles a version of the program with only the specified permissions
*/
console.log('Hello', Deno.env.get('USERNAME'));