import {combineReducers} from 'redux';
import company from './modules/company/company';
import user from './modules/user/user';

export const rootReducer = combineReducers({
    user: user,
    company: company
})