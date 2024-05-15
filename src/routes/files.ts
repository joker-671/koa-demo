import { base64Decode, getData, setData } from '@/utils';
import Router from 'koa-router'
import path from 'path'

const filesRoutes = new Router();

// 文件上传接口
filesRoutes.post('/api/files/upload', ctx => {
  const files = ctx.request.files;
  if (files) {
    const paths = [];
    const baseDir = path.resolve(process.cwd(), 'public')
    const token = ctx.cookies.get('token') as string;
    const { id } = JSON.parse(base64Decode(token));
    const assets = getData(`assets`) || {};
    const userFiles = assets[id] || []
    for (let i in files) {
      const item = files[i];
      if (Array.isArray(item)) {
        item.forEach(file => {
          const assetpath = file.filepath.replace(baseDir, '');
          paths.push(assetpath)
        })
      } else {
        paths.push(item.filepath.replace(baseDir, ''))
      }
    }
    const fileList = Array.from(new Set([...userFiles, ...paths]));
    assets[id] = fileList;
    console.log(assets)
    setData(assets, `assets`)
    ctx.body = {
      code: 0,
      message: 'success',
      data: fileList
    }
    return
  }
  ctx.body = {
    code: -1,
    message: 'upload failed!',
    data: null
  }
});

filesRoutes.get('/api/files/get', ctx => {
  const token = ctx.cookies.get('token') as string;
  const { id } = JSON.parse(base64Decode(token));
  const files = getData(`assets.${id}`);
  ctx.body = {
    code: 0,
    message: 'success',
    data: files
  }
})

export default filesRoutes;
