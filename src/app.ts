import Koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import bodyParse from 'koa-bodyparser';
import routes from './routes';
import koaBody from 'koa-body';
import { base64Encode, makeDir } from './utils';
import verifyToken from './utils/verifyToken';

const app = new Koa();

const cachePath = path.resolve(process.cwd(), 'cache');
const assetsPath = path.resolve(process.cwd(), 'public/assets')
makeDir(cachePath);
makeDir(assetsPath);

// 设置静态资源目录为public文件夹
app.use(koaStatic(path.join(process.cwd(), 'public')));
app.use(verifyToken)
// 定义需要处理文件上传的路由
app.use(async (ctx, next) => {
  if (ctx.path === '/api/files/upload') {
    await koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(process.cwd(), 'public/assets'), // 上传文件保存的目录
        keepExtensions: true, // 保持文件扩展名
        onFileBegin: (name, file) => { // 自定义文件名的生成规则
          const newFileDir = file.newFilename.split('.')[0] || base64Encode(new Date().getTime() + '');
          const dir = path.join(process.cwd(), `public/assets/${newFileDir}`)
          makeDir(dir)
          file.filepath = path.join(dir, name);
        }
      }
    })(ctx, next);
    return
  }
  await next();
});
app.use(bodyParse())
routes.forEach(item => {
  app.use(item.routes())
  app.use(item.allowedMethods())
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});