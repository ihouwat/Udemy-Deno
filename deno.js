// Deno.args returns arguments from a script.
const food = Deno.args[0];
const parent = Deno.args[1];

if(food === 'love' && parent === 'Igor') console.log('Deno is born!');
else console.log('Deno is still an egg!');