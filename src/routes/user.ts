import { getData } from '@/utils';
import Router from 'koa-router'

const userRoutes = new Router();

interface UserInfo {
  phone: string;
  password: string;
  avatar?: string;
  nickname?: string;
  decription?: string;
}

interface LoginRequestParams {
  phone: string;
  password: string;
}

type LoginResponseParams = Omit<UserInfo, 'password'>

userRoutes.post('/api/user/login', ctx => {
  const reqData = ctx.request.body as LoginRequestParams;
  const users = getData('users') as (UserInfo[] | undefined);
  if (Array.isArray(users)) {
    const result = users.find(item => item.phone == reqData.phone);
    if (result) {
      const { password, ...info } = result;
      ctx.body = {
        code: 0,
        message: 'success!',
        data: info as LoginResponseParams
      };
      return
    }
  }
  ctx.body = {
    code: -1,
    message: 'The user is not exist!',
    data: null
  };
})

interface RegisterRequestParams {
  phone: string;
  password: string;
}

userRoutes.post('/api/user/regist', ctx => {
  ctx.body = "hello regist"
})




export default userRoutes;