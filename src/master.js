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
            color:'light',
            text:'NUNI'
        };
        default : return {}
    }
}