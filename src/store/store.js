import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import reduxlogger from "redux-logger";
import { root } from "./config/root-reducer";
import ini from "./config/initial-state";
const middlewares = [Thunk];

if (process.env.NODE_ENV === "development") middlewares.push(reduxlogger);

export const store = createStore(root, ini, applyMiddleware(...middlewares));
