import taskReducer from './taskReducer';
import groupReducer from './groupReducer';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    tasks: taskReducer,
    groups: groupReducer
})

export default rootReducers;