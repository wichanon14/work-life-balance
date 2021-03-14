export const searchPriority = (task) =>{
    
    let p = 0,taskName = '';
    
    if( task.indexOf("#UI") > -1 ){
        //Urgent Important
        p = 0;
        taskName = task.replaceAll('#UI','')
    }else if( task.indexOf("#UNI") > -1 ){
        //Urgent Not Important
        p = 1;
        taskName = task.replaceAll('#UNI','')
    }else  if( task.indexOf("#NUI") > -1 ){
        //Not Urgent But Important
        p = 2;
        taskName = task.replaceAll('#NUI','')
    }else if( task.indexOf("#NUNI") > -1 ){
        //Not Urgent Not Important
        p = 3;
        taskName = task.replaceAll('#NUNI','')
    }else{
        p = 3;
        taskName = task;
    }

    return {
        task:taskName,
        priority:p
    }
}

export const getPriorityDisplay = (priority)=>{
    switch(priority){
        case 0:return {
            color:'danger',
            text:'UI'
        };
        case 1:return {
            color:'warning',
            text:'UNI'
        };
        case 2:return {
            color:'primary',
            text:'NUI'
        };
        case 3:return {
            color:'white',
            text:'NUNI'
        };
        default : return {}
    }
}

export const getCurrentDate = ()=>{
    let d = new Date();
    let day = (d.getDate().toString().length < 2)?'0'+d.getDate():d.getDate();
    let month = (d.getMonth().toString().length < 2)?'0'+(d.getMonth()+1):d.getMonth()+1
    let year = d.getFullYear()

    return year+'-'+month+'-'+day;
}

export const convertDateToDateFormat = (d)=>{

    let day = (d.getDate().toString().length < 2)?'0'+d.getDate():d.getDate();
    let month = (d.getMonth().toString().length < 2)?'0'+(d.getMonth()+1):d.getMonth()+1
    let year = d.getFullYear()

    return year+'-'+month+'-'+day;
}

export const getMonthNameFromMonthNum = (month)=>{

    month += 1;
    
    switch(month){
        case 1 : return 'January';
        case 2 : return 'Febuary';
        case 3 : return 'March';
        case 4 : return 'April';
        case 5 : return 'May';
        case 6 : return 'June';
        case 7 : return 'July';
        case 8 : return 'August';
        case 9 : return 'September';
        case 10 : return 'October';
        case 11 : return 'November';
        case 12 : return 'Decembern';
        default: return '';
    }

}
