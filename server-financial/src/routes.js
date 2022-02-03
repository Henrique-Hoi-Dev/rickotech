import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import ProductController from './app/controller/ProductController';
import FileController from './app/controller/FileController';
import SalesController from './app/controller/SalesController';
import AdressController from './app/controller/AdressController';
import FinancialBoxController from './app/controller/FinancialBoxController';

import authMiddleware from './app/middlewares/auth';
import ServiceController from './app/controller/ServiceController';

const routes = new Router();
const upload = multer(multerConfig);

//cadastro
routes.post('/users/register', UserController.storeUser);
routes.post('/users/authenticate', SessionController.storeSession);

//autenticação
// routes.use(authMiddleware);

//users
routes.put('/user/:id', UserController.updateUserId)
      .get('/users', UserController.getUserDetails)
      .get('/user/:id', UserController.getUserDetailsId)
      .delete('/user/:id', UserController.deleteUserId);

//adress 
routes.post('/adress/:user_id', AdressController.storeAdress)
      .put('/adress/:id', AdressController.updateAdressId)
      .get('/adress/:id', AdressController.getAdressDetailsId)
      .delete('/adress/:id', AdressController.deleteAdress);

//avatar
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/avatar', FileController.getFileDetails);
routes.delete('/avatar/:id', FileController.deleteFileId);


//products
routes.post('/product', ProductController.storeProduct)
      .post('/product/avatar', ProductController.updateProductId)
      .put('/product/:id', ProductController.updateProductId)
      .get('/products', ProductController.getProductDetails)
      .get('/product/:id', ProductController.getProductDetailsId)
      .delete('/product/:id', ProductController.deleteProductId);

//sales
routes.post('/sales', SalesController.storeSales)
      .get('/saleses', SalesController.getSalesDetails)
      .get('/sales/:id', SalesController.getSalesDetailsId)
      .get('/salesFinancial/:financial_id', SalesController.getsSalesDetailsTotalValorId)
      .delete('/sales/:id', SalesController.deleteSalesId);

//services
routes.post('/service/:id', ServiceController.storeService)
      .get('/services', ServiceController.getsServiceDetails)
      .get('/service/:id', ServiceController.getsServiceDetailsId)
      .get('/serviceFinancial/:financial_id', ServiceController.getsServiceDetailsTotalValorId);

//financialBox 
routes.post('/financialBox/:user_id', FinancialBoxController.storeFinancialBox)
      .put('/financialBox/:id', FinancialBoxController.updateFinancialBoxId)
      .get('/financialBoxs', FinancialBoxController.getsFinancialBoxDetails)
      .get('/financialBox/:id', FinancialBoxController.getsFinancialBoxDetailsId)

export default routes;
