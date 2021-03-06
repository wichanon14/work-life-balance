import axios from 'axios';

const initialState = {
    taskList: []
}

const isTaskExist = (taskList,task)=>{
    const found = taskList.find(data=>data.task===task);
    return (found)?true:false
}

const addTask = (state,action)=>{

    var data = JSON.stringify(
        {
            "action":"createTask",
            "payload":{
                "task": action.payload.task,
                "priority": action.payload.priority,
                "group": action.payload.group
            }
        });
        
    var config = {
        method: 'post',
        url: 'http://localhost/work-life-balance-api/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {

    })
    .catch(function (error) {
        console.log(error);
    });

    return state
}

const updateTask = (state,action) =>{
    var data = JSON.stringify(
        {
            "action":"updateTask",
            "payload":action.payload
        });
        
    var config = {
        method: 'post',
        url: 'http://localhost/work-life-balance-api/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
    
    })
    .catch(function (error) {
        console.log(error);
    });

    return state
}

const taskReducer = (state = initialState, action)=>{

    switch (action.type) {
        case 'CREATE_TASK':
            return (action.payload.task && !isTaskExist(state.taskList,action.payload.task) )?
                addTask(state,action):state;
        case 'UPDATE_TASK':{
            return updateTask(state,action)
        }
        case 'SET_TASK_LIST':
            return {
                ...state,
                taskList:action.payload
            }
        default:
          return state
    }

}

export default taskReducer;