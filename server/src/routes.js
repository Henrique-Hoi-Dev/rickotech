import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import ProductController from './app/controller/ProductController';
import FileController from './app/controller/FileController';
import FinanceiroController from './app/controller/FinanceiroController';
import AdressController from './app/controller/AdressController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//cadastro
routes.post('/users/register', UserController.store);
routes.post('/users/authenticate', SessionController.store);

//autenticação
routes.use(authMiddleware);

//perfil
routes.put('/users', UserController.update);
routes.get('/users', UserController.getAll);

//endereço 
routes.post('/adress/:user_id', AdressController.store)

//avatar
routes.post('/files', upload.single('file'), FileController.store);

//produtos
routes.put('/products/:id', ProductController.updateProduct);
routes.post('/products/new', ProductController.store);
routes.get('/products', ProductController.getAll);
routes.get('/products/:id', ProductController.getById);
routes.post('/product/avatar', ProductController.updateProduct);
routes.delete('/products/:id', ProductController.deleteProduct);

//vendas
routes.post('/venda/nova', FinanceiroController.store);
routes.get('/venda/:id', FinanceiroController.getById);
routes.get('/vendas', FinanceiroController.getAll);
routes.put('/venda/:id', FinanceiroController.update);

export default routes;
