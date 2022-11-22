import { combineReducers } from "redux";

import auth from './auth.js';
import orgs from './orgs.js';
import searchData from './search.js';
import count from './count.js';
 
export default combineReducers({
    count,
    searchData,
    auth,
    orgs,
})