import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import memory from './memory';

export default combineReducers({
    alert,
    auth,
    memory
});
