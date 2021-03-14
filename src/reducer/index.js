import taskReducer from './taskReducer';
import groupReducer from './groupReducer';
import DailyReducer from './DailyReducer';
import UserReducer from './UserReducer';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    tasks: taskReducer,
    groups: groupReducer,
    dailyList:DailyReducer,
    userData:UserReducer
})

export default rootReducers;