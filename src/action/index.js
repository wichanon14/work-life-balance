import axios from 'axios';

export const createTask = (data)=>{
    return {
        type: 'CREATE_TASK',
        payload: data
    }
}

export const updateTask = (data)=>{
    return {
        type: 'UPDATE_TASK',
        payload: data
    }
}

export const createGroup = (data)=>{
    return {
        type: 'CREATE_GROUP',
        payload: data
    }
}

export const selectGroupGlobal = (data)=>{
    return {
        type: 'SELECT_GROUP',
        payload: data
    }
}

export const setAllGroup = (data)=>{
    return {
        type: 'SET_ALL_GROUP',
        payload: data
    }
}

export const sortTaskByPriority = (data)=>{
    return {
        type: 'SORT_BY_PRIORIY',
        payload: data
    }
}

export const showAllStatusTask = (data)=>{
    return {
        type: 'SHOW_ALL_STATUS',
        payload: data
    }
}

export const setDailyList = (data) =>{
    return {
        type: 'SET_DAILY_LIST',
        payload: data
    }
}

export const triggerDailyDropArea = (data) =>{
    return {
        type: 'TRIGGER_DAILY_DROP_AREA',
        payload: data
    }
}

export const triggerTaskDropArea = (data) =>{
    return {
        type: 'TRIGGER_TASK_DROP_AREA',
        payload: data
    }
}

export const fetchGroup = ()=>{
    return (dispatch,state)=>{
        axios.get('http://localhost/work-life-balance-api/?action=getGroup')
        .then(response=>{

            let dataList = response.data;
            dataList.push({
                id:-1,
                groupName: '+'
            })
            dispatch({ type: "SET_ALL_GROUP", payload: dataList })
            
            console.log('state >><',state);

        })   
    }
}

export const fetchTask = (dispatch,group,user=1)=>{
    dispatch({ type: "SET_TASK_LIST", payload: [] })
    return (dispatch)=>{
        axios.get('http://localhost/work-life-balance-api/?action=getTask&group='+group.id+'&user='+user)
        .then(response=>{
            dispatch({ type: "SET_TASK_LIST", payload: response.data })
        })
    }
}

export const fetchDailyTask = (dispatch,date)=>{
    dispatch({ type: "SET_DAILY_LIST", payload: [] })
    return (dispatch)=>{
        axios.get('http://localhost/work-life-balance-api/?action=getDaily&date='+date)
        .then(response=>{
            dispatch({ type: "SET_DAILY_LIST", payload: response.data })
        })
    }
}