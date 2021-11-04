import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'vendas',
      storage,
      whitelist: ['auth', 'user', 'product', 'sales', 'account', 'adresses'],
    },
    reducers
  );

  return persistedReducer;
};
