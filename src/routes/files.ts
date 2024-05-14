import Router from 'koa-router'
import path from 'path'

const filesRoutes = new Router();

// 文件上传接口
filesRoutes.post('/api/files/upload', ctx => {
  // const file = ctx.request.files.file;
  // const fileHash = saveFile(file);
  // ctx.body = { fileHash };
});

// 文件下载接口
filesRoutes.get('/api/files/download', ctx => {
  console.log(ctx.request.body,ctx.request.query)
  // const fileHash = ctx.query.fileHash;
  // const filePath = path.join(__dirname, 'assets', fileHash);
  // ctx.attachment(filePath);
  // ctx.body = fs.createReadStream(filePath);
});




export default filesRoutes;