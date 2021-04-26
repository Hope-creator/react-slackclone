import {combineReducers} from 'redux';
import user from './modules/user/user';

export const rootReducer = combineReducers({
    user: user
})