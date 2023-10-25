import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistStore, persistReducer, PERSIST} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {exampleCounterSlice} from '@store/slices/exampleCounter';
import {exampleApi} from '@services/exampleApi';

const rootReducer = combineReducers({
  exampleCounter: exampleCounterSlice.reducer,
  [exampleApi.reducerPath]: exampleApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(exampleApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
