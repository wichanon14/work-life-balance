import axios from 'axios';

const initialState = {
    groupList: [],
    groupSelect:{}
}

const isGroupExist = (groupList,group)=>{
    const found = groupList.find(data=>data.groupName===group);
    return (found)?true:false
}

const addGroup = (state,action)=>{

    var data = JSON.stringify(
        {"action":"createGroup","payload":{"groupName":action.payload.groupName}});

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
        console.error(error);
    });

    return state

}

const groupReducer = ( state=initialState,action )=>{
    
    switch(action.type){
        case 'CREATE_GROUP':
            return (action.payload.groupName && !isGroupExist(state.groupList,action.payload.groupName))?
                addGroup(state,action):state;
        case 'SELECT_GROUP':
            return {
                ...state,
                groupSelect:action.payload
            }
        case 'SET_ALL_GROUP':
            return {
                ...state,
                groupList:action.payload
            }
        default: return state;
    }
}

export default groupReducer;