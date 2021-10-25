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
routes.get('/overdues', AccountController.getAccountOverdueDetails);
routes.delete('/account/:id', AccountController.deleteAccountId);
routes.get('/paidAccount', AccountController.getAccountPaidDetails);
routes.get('/pendingAccount', AccountController.getAccountPendingDetails);
routes.get('/cancelAccount', AccountController.getAccountCancelDetails);

// rotas de parcelas
routes.post('/account/:accounts_id/portion', PortionController.storePortion);
routes.put('/portion/:id', PortionController.updatePortionId);
routes.get('/portionAccount/:accounts_id', PortionController.getPortionDetailsWithValouTotal);
routes.get('/portion/:id', PortionController.getPortionDetailsId);
routes.delete('/portion/:id', PortionController.deletePortionId);

// rotas de chamada dos cards
routes.get('/infoCardOverdue', CardController.getCardOverdueDetails);
routes.get('/infoCardOwing', CardController.getCardOwingDetails);
routes.get('/infoCardPaid', CardController.getCardPaidDetails);
routes.get('/infoCardTotal', CardController.getCardTotalDetails);

export default routes;
