import { Application, send } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as log from 'https://deno.land/std/log/mod.ts';
import api from './api.ts';

const app = new Application();
const PORT = 8000;

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('INFO'),
  },
  loggers: {
    default: {
      level: 'INFO',
      handlers: ['console']
    }
  }
});

// Adding event listener to handle uncaught errors
app.addEventListener('error', event => {
  log.error(event.error);
});

// Middleware for logging errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = "Internal server error";
    throw err;
  }
});


// Logging request info
app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get('X-Response-Time')
  log.info(`${ctx.request.method} ${ctx.request.url} ${time}`);
});

// Calculating response time, notice how next() is between start and delta
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${delta}ms`)
});

// app.use to register middleware. the usage below catches all routes we want to support
app.use(api.routes());
app.use(api.allowedMethods());

// Serving static files from Deno (UI code)
app.use(async ctx => {
  const filePath = ctx.request.url.pathname;
  const fileWhiteList = [
    '/index.html',
    '/javascripts/script.js',
    '/stylesheets/style.css',
    '/images/favicon.png'
  ];
  if(fileWhiteList.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public` // look in working directory
    });
  }
});

// Checks if our module is being executed as a program
if(import.meta.main) {
  log.info(`Starting server on port ${PORT}....`)
  // app.listen listen to a port
  await app.listen({
    port: PORT
  });
}
