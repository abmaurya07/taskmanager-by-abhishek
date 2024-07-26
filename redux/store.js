// Import Redux Persist and localStorage
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This uses localStorage in the browser
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './TasksData/tasksSlice';
import userReducer from './UserData/userSlice';

// Create a persist config for the reducers
const tasksPersistConfig = {
  key: 'tasks',
  storage, // Use localStorage
  whitelist: ['tasks'], // only persist the tasks state
};

const userPersistConfig = {
  key: 'user',
  storage, // Use localStorage
  whitelist: ['username', 'loggedIn'], 
};

// Create a persisted reducer 
const persistedTasksReducer = persistReducer(
  tasksPersistConfig,
  tasksReducer
);

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userReducer
)

const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    user: persistedUserReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor using the store
const persistor = persistStore(store);

// Export the store and the persistor
export { store, persistor };
