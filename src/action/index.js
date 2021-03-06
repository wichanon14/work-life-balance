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