import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'RICKOTECH_API',
      storage,
      whitelist: ['auth', 'user', 'product', 'venda'],
    },
    reducers
  );

  return persistedReducer;
};
