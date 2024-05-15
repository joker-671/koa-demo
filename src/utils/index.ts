import path from "path";
import fs from 'fs';
import get from 'lodash/get';
import set from 'lodash/set';

export const dirName = process.cwd();
const cache_file = path.resolve(dirName, 'cache/data.json');

// 将数据写入JSON文件
export const setData = (data: Partial<any>, propertyPath: string) => {
  if (!fs.existsSync(cache_file)) {
    fs.writeFileSync(cache_file, JSON.stringify({}, null, 2));
  }
  const dataJSON = fs.readFileSync(cache_file, 'utf8');
  const value = JSON.parse(dataJSON)
  const result = set(value, propertyPath, data);
  fs.writeFileSync(cache_file, JSON.stringify(result, null, 2));
};

// 从JSON文件读取数据
export const getData = (propertyPath?: string) => {
  if (fs.existsSync(cache_file)) {
    if (propertyPath) {
      const data = fs.readFileSync(cache_file, 'utf8');
      const value = JSON.parse(data)
      return get(value, propertyPath);
    }
  }
  return undefined;
};

export const base64Encode = (str: string) => {
  const buffer = Buffer.from(str, 'utf-8');
  return buffer.toString('base64');
};

export const base64Decode = (str: string) => {
  const buffer = Buffer.from(str, 'base64');
  return buffer.toString('utf-8');
};

export const makeDir = (dir: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (error) => {
      if (error) {
        reject(error)
        return console.error(error);
      }
      resolve(`目录 '${dir}' 创建成功！`)
    });
  })
}