// Deno.args returns arguments from a script.
const food = Deno.args[0];
const parent = Deno.args[1];

if(food === 'love' && parent === 'Igor') console.log('Deno is born!');
else console.log('Deno is still an egg!');

setTimeout(() => {
  console.log('check set timeout')
  // Deno.metrics tell us about the communication between JS and Rust
  console.log(Deno.metrics().opsCompletedAsync);
}, 1000);

/* 
  Window object is part of Deno.
  Deno strives for a 'browser-compatible' API. For example, it includes a 'fetch' API, unlike Node.js.
*/
console.log(window);
