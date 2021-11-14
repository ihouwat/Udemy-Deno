import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';

const app = new Application();
const PORT = 8000;

// app.use to register middleware
app.use(ctx => {
  ctx.response.body = `
  {___     {__      {_         {__ __        {_       
  {_ {__   {__     {_ __     {__    {__     {_ __     
  {__ {__  {__    {_  {__     {__          {_  {__    
  {__  {__ {__   {__   {__      {__       {__   {__   
  {__   {_ {__  {______ {__        {__   {______ {__  
  {__    {_ __ {__       {__ {__    {__ {__       {__ 
  {__      {__{__         {__  {__ __  {__         {__
                  Mission Control API`;
});

// Checks if our module is being executed as a program
if(import.meta.main) {
  // app.listen listen to a port
  await app.listen({
    port: PORT
  });
}
