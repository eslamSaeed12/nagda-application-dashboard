import ini from "../config/initial-state";
import {
  ENTITIES_COUNT_DATA,
  ENTITIES_COUNT_FAIL,
  ENTITIES_COUNT_LOAD,
} from "../actions/names";

export const indexStore = (state = ini.index, action) => {
  switch (action.type) {
    case ENTITIES_COUNT_LOAD:
      return { ...state, entitesLoad: action.payload }; // start loading but not end yet
    case ENTITIES_COUNT_FAIL:
      return { ...state, entitesFail: action.payload };
    case ENTITIES_COUNT_DATA:
      return { ...state, entites: action.payload };
    default:
      return { ...state };
  }
};
