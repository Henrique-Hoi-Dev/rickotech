import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import ProductController from './app/controller/ProductController';
import FileController from './app/controller/FileController';
import SalesController from './app/controller/SalesController';
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
routes.post('/products/new', ProductController.store);
routes.put('/products/:id', ProductController.updateProduct);
routes.get('/products', ProductController.getAll);
routes.get('/products/:id', ProductController.getById);
routes.post('/product/avatar', ProductController.updateProduct);
routes.delete('/products/:id', ProductController.deleteProduct);

//vendas
routes.post('/sales/:product_id', SalesController.store);
routes.get('/sales/:id', SalesController.getById);
routes.get('/sales', SalesController.getAll);
routes.put('/sales/:id', SalesController.update);

export default routes;
