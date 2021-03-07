import taskReducer from './taskReducer';
import groupReducer from './groupReducer';
import DailyReducer from './DailyReducer';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    tasks: taskReducer,
    groups: groupReducer,
    dailyList:DailyReducer
})

export default rootReducers;