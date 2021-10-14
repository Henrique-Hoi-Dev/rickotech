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
routes.post('/users/register', UserController.storeUser);
routes.post('/users/authenticate', SessionController.storeSession);

//autenticação
routes.use(authMiddleware);

//perfil
routes.put('/user', UserController.updateUserId);
routes.get('/users', UserController.getUserDetails);
routes.get('/user/:id', UserController.getUserDetailsId);
routes.delete('/user/:id', UserController.deleteUserId);

//endereço 
routes.post('/adress/:user_id', AdressController.storeAdress)
routes.put('/adress/:id', AdressController.updateAdressId)
routes.delete('/adress/:id', AdressController.deleteAdress)

//avatar
routes.post('/files', upload.single('file'), FileController.store);

//produtos
routes.post('/products/new', ProductController.storeProduct);
routes.put('/product/:id', ProductController.updateProductId);
routes.get('/products', ProductController.getProductDetails);
routes.get('/product/:id', ProductController.getProductDetailsId);
routes.post('/product/avatar', ProductController.updateProductId);
routes.delete('/product/:id', ProductController.deleteProductId);

//vendas
routes.post('/sales/:product_id', SalesController.storeSales);
routes.get('/sales/:id', SalesController.getSalesDetailsId);
routes.get('/saleses', SalesController.getSalesDetails);
routes.put('/sales/:id', SalesController.updateSalesId);
routes.delete('/sales/:id', SalesController.deleteSalesId);

export default routes;
