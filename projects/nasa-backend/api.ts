import { Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as planets from './models/planets.ts';
import * as launches from './models/launches.ts';
import { Launch }  from './models/launches.ts';

const router = new Router();

router.get('/', ctx => {
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

router.get('/planets', ctx => {
  // Oak comes with the ability to throw errors
  // ctx.throw(501, 'sorry, planets are not available');
  ctx.response.body = planets.getAllPlanets();
});

router.get('/launches', ctx => {
  ctx.response.body = launches.getAll();
});

router.get('/launches/:id', ctx => {
  if(ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    if(launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, 'Launch with that ID does not exist.');
    }
  }
})

router.post('/launches', async ctx => {
  const result = ctx.request.body();
  const data: Launch = await result.value;
  launches.addOne(data);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
})

export default router;