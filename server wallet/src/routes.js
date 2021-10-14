import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import AccountController from './app/controller/AccountController';
import PortionController from './app/controller/PortionController';
import FileController from './app/controller/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users/signup', UserController.store);
routes.post('/users/signin', SessionController.store);
routes.post('/validateToken', SessionController.validateToken);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

// rotas usuario
routes.put('/user/:id', UserController.update);
routes.get('/user', UserController.getAllUser);
routes.get('/user/:id', UserController.getUserId);

// rotas de registro e edição de contas
// rotas de chamada listas de contas
routes.post('/account/new', AccountController.store);
routes.put('/account/:id', AccountController.updateAccount);
routes.get('/account/:id', AccountController.getById);
routes.get('/account', AccountController.getAll);
routes.get('/vencidas', AccountController.getOverdueAccount);

// rotas de registro de parcelas
routes.post('/account/:accounts_id/portion', PortionController.store);
routes.put('/portion/:id', PortionController.updatePortion);
routes.get('/portions/:id', PortionController.getPortionListComIdConta);
routes.get('/portion/:id', PortionController.getById);
routes.delete('/portion/:id', PortionController.deletePortion);

// rota de deletar conta
routes.delete('/account/:id', AccountController.deleteAccount);

// rotas de chamada dos cards
routes.get('/infoCardOverdue', AccountController.getCardInfoOverdue);
routes.get('/infoCardOwing', AccountController.getCardInfoOwing);
routes.get('/infoCardPaid', AccountController.getCardInfoPaid);
routes.get('/infoCardTotal', AccountController.getCardInfoTotal);

export default routes;
