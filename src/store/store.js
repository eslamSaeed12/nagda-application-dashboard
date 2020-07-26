import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "localforage";
import persistConfig from "./config/persist-config";
import Thunk from "redux-thunk";
import reduxlogger from "redux-logger";
import { root } from "./config/root-reducer";
import ini from "./config/initial-state";
const middlewares = [Thunk];

if (process.env.NODE_ENV === "development") middlewares.push(reduxlogger);



const persistedReducer = persistReducer(persistConfig(storage), root);

export const store = createStore(
  persistedReducer,
  ini,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
