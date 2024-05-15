import type { Middleware } from 'koa'
import { base64Decode, getData } from '.';
import { UserInfo } from '@/routes/user';

const allows = [
  '/api/user/login',
  '/api/user/regist',
]
const verifyToken: Middleware = async (ctx, next) => {
  const token = ctx.cookies.get('token');
  if (!allows.includes(ctx.path)) {
    if (!token) {
      ctx.body = {
        code: -1,
        message: 'Not login'
      }
      return
    }
    const { id, times } = JSON.parse(base64Decode(token))
    const users = getData('users') as UserInfo[];
    const current = users.find(item => item.id === id);
    const currentTime = new Date().getTime();
    if (currentTime - times > 60 * 1000 * 30) {
      ctx.body = {
        code: -1,
        message: 'The login has expired.'
      }
      return
    }
    if (!current) {
      ctx.body = {
        code: -1,
        message: 'Illegal user!'
      }
      return
    }
  }
  await next()
}
export default verifyToken;