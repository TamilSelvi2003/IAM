import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from './AuthSlice';
import reducer from './RouteSlice';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'error'],  
};

const rootReducer = combineReducers({
  Auth: AuthSlice,
  route:reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  
    }),
});

export const persistor = persistStore(store);
