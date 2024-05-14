import Koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import send from 'koa-send'
import bodyParse from 'koa-bodyparser';
import routes from './routes';

const app = new Koa();

// 设置静态资源目录为public文件夹
// app.use(koaStatic(path.join(__dirname, 'public')));
app.use(bodyParse())

app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    await send(ctx, 'index.html', { root: path.join(process.cwd(), 'public') });
    return
  }
  await next();
});

routes.forEach(item => {
  app.use(item.routes())
  app.use(item.allowedMethods())
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});