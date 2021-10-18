import { Router } from 'express';

import AccountController from './app/controller/AccountController';
import CardController from './app/controller/CardController';
import PortionController from './app/controller/PortionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

// rotas de account
routes.post('/account/new', AccountController.storeAccount);
routes.put('/account/:id', AccountController.updateAccountId);
routes.get('/account/:id', AccountController.getAccountDetailsId);
routes.get('/accounts', AccountController.getAccountDetails);
routes.get('/vencidas', AccountController.getAccountOverdueDetails);
routes.delete('/account/:id', AccountController.deleteAccountId);

// rotas de parcelas
routes.post('/account/:accounts_id/portion', PortionController.store);
routes.put('/portion/:id', PortionController.updatePortion);
routes.get('/portions/:id', PortionController.getPortionListComIdConta);
routes.get('/portion/:id', PortionController.getById);
routes.delete('/portion/:id', PortionController.deletePortion);

// rotas de chamada dos cards
routes.get('/infoCardOverdue', CardController.getCardOverdueDetails);
routes.get('/infoCardOwing', CardController.getCardOwingDetails);
routes.get('/infoCardPaid', CardController.getCardPaidDetails);
routes.get('/infoCardTotal', CardController.getCardTotalDetails);

export default routes;
