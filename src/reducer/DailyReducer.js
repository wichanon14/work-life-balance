const dailyState = {
    dailyList : [{
        create_date: "2021-03-06 01:14:39",
        group: 3,
        id: 33,
        isComplete: false,
        priority: 0,
        taskName: "Daily List ",
        update_date: "2021-03-06 01:14:39"
    }],
    showDailyDropArea:false
}


const DailyReducer = ( state=dailyState, action )=>{

    switch( action.type ){
        case 'SET_DAILY_LIST':
            return {
                ...state,
                dailyList:action.payload
            }
        case 'TRIGGER_DAILY_DROP_AREA':
            return {
                ...state,
                showDailyDropArea:action.payload
            }
        default : return state
    }


}

export default DailyReducer;

