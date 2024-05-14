import { base64Decode, base64Encode, getData, setData } from '@/utils';
import Router from 'koa-router'

const userRoutes = new Router();

interface UserInfo {
  id?: number;
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
    const result = users.find(item => item.phone == reqData.phone && item.password == reqData.password);
    if (result) {
      const loginCookie = {
        id: result.id,
        times: new Date().getTime()
      }
      const token = base64Encode(JSON.stringify(loginCookie))
      ctx.cookies.set('token', token);
      ctx.body = {
        code: 0,
        message: 'success!',
        data: {
          ...result,
          password: undefined,
        } as LoginResponseParams
      };
      return
    }
    ctx.body = {
      code: 0,
      message: 'Check whether the parameters are correct!',
      data: null
    };
    return
  }
  ctx.body = {
    code: -1,
    message: 'The account is not exist!',
    data: null
  };
})

interface RegisterRequestParams {
  phone: string;
  password: string;
}

userRoutes.post('/api/user/regist', ctx => {
  const data = ctx.request.body as RegisterRequestParams;
  if (!data.password || !data.phone) {
    ctx.body = {
      code: -1,
      message: 'The paramter is missing!',
      data: null
    };
    return
  }
  const users = getData('users') as (UserInfo[] | undefined);
  const target = {
    decription: '',
    avatar: '',
    nickname: '',
    ...data,
    id: new Date().getTime()
  } as UserInfo;
  if (Array.isArray(users)) {
    const result = users.find(item => item.phone == data.phone);
    if (result) {
      ctx.body = {
        code: -1,
        message: 'The account is exist!',
        data: null
      };
      return
    }
    users.push(target)
    setData(users, 'users');
    ctx.body = {
      code: 0,
      message: 'success!',
      data: null
    };
    return
  }
  setData([target], 'users')
  ctx.body = {
    code: 0,
    message: 'success!',
    data: null
  };
})

type UserEditRequestParams = Omit<UserInfo, 'id'>;
userRoutes.post('/api/user/edit', ctx => {
  const data = ctx.request.body as UserEditRequestParams;
  const users = getData('users') as (UserInfo[] | undefined);
  if (Array.isArray(users)) {
    const sign = JSON.parse(base64Decode(ctx.cookies.get('token') || ''))
    if (!sign?.id) {
      ctx.body = {
        code: -1,
        message: 'sign is missing',
        data: null
      }
      return
    }
    const result = users.map(item => {
      if(item.id == sign.id){
        return {
          ...item,
          ...data
        }
      }
      return item
    });
    setData(result, 'users');
    ctx.body = {
      code: 0,
      message: 'success!',
      data: null
    };
    return
  }
  ctx.body = {
    code: -1,
    message: 'Illegal user!',
    data: null
  }
})

export default userRoutes;