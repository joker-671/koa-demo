import Router from 'koa-router';
import userRoutes from './user';
import filesRoutes from './files';


const routes:Router[]=[
  userRoutes,
  filesRoutes
]

export default routes;