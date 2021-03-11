import { ListGroup,Row,Col,Badge } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { fetchTask,updateTask,triggerDailyDropArea } from '../action';
import { Animated } from "react-animated-css";
import { Draggable,Droppable } from 'react-beautiful-dnd';
import DropArea from './DropArea';
import { getCurrentDate, getPriorityDisplay } from '../master'

function TaskBox(){

    const [tasks,setTasks] = useState([])
    const [shouldSort,setShouldSort]=useState(false)
    const [showAll,setShowAll] = useState(false)
    const [showDropArea,setShowDropArea] = useState(false)
    const [groupSelect,setGroupSelect] = useState({})
    const [taskListOrder,setTaskListOrder] = useState(tasks);
    const tasksRetrieve = useSelector(state=>state.tasks)
    const groupList = useSelector(state=>state.groups)    
    const dispatch = useDispatch();

    const compare = (a,b)=>{
        if( a.priority < b.priority)
            return 1
        if( a.priority > b.priority)
            return -1
        return 0
    }

    useEffect(()=>{
        setTasks(tasksRetrieve.taskList)
        setTaskListOrder(tasksRetrieve.taskList);
    },[tasksRetrieve])

    useEffect(()=>{
        
        setShouldSort(tasksRetrieve.prioritySort)
        if(tasksRetrieve.prioritySort){
            setTasks(tasksRetrieve.taskList.sort(compare));
        }        
    },[tasksRetrieve.prioritySort,tasksRetrieve.taskList])

    useEffect(()=>{
        setShowAll(tasksRetrieve.showAllStatus)
    },[tasksRetrieve.showAllStatus])

    useEffect(()=>{
        setShowDropArea(tasksRetrieve.showTaskDropArea)
    },[tasksRetrieve.showTaskDropArea])

    useEffect(()=>{
        setGroupSelect(groupList.groupSelect)
    },[groupList.groupSelect])

    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;
        task.taskDate = getCurrentDate();
        dispatch(updateTask(task));
        setTimeout(() => {
            dispatch(fetchTask(dispatch,{
                id:task.group
            }))
        }, 500);
    }

    function handleOnDrag(event) {

        if( event.nativeEvent.which !== 3 )
            dispatch(triggerDailyDropArea(true));

    }


    

    return (
        (showDropArea)?
        (<DropArea dropId = "taskLists" title="Drop Task List Here"/>):
        (
            <div style={{minHeight:'50vh',maxHeight:'50vh',overflowY:'auto',overflowX:'hidden'}} className={'d-flex flex-column-reverse border rounded scrollBar'}>
                <Droppable droppableId="taskLists" >
                    {
                        (provided) =>(tasks.length === 0)?(
                            <Row style={{minHeight:'25vh',maxHeight:'25vh'}} className="taskLists"
                            {...provided.droppableProps} ref={provided.innerRef}>
                                <Col className={'text-center'}>
                                    No Task
                                </Col>
                            </Row>
                            ):(
                            <ListGroup style={{'display':(shouldSort)?'none':'flex'}} className="taskLists"
                                {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    taskListOrder.map((task,i)=>((!task.isComplete||showAll)
                                        && ( task.taskDate === null||showAll )
                                        && task.group === groupSelect.id)?
                                    (
                                        <div style={{'opacity':(task.isComplete)?0.5:1}}>
                                        <Draggable key={task.id} draggableId={task.id+""} index={i}>
                                            {
                                                (provided)=>(
                                                    <Animated animationIn={(i === 1)?"bounceInLeft":''} 
                                                        animationInDuration={500} isVisible={true}>
                                                        <ListGroup.Item className={'rounded'} onClick={()=>completeTask(task)} 
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            onMouseDown={(e)=>{handleOnDrag(e)}} 
                                                            onMouseUp={()=>{dispatch(triggerDailyDropArea(false))}}
                                                            data-toggle="tooltip" title={task.taskFullName}>
                                                            <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                                                style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                                            {'TASK-'+task.id+' '+task.taskName}
                                                            {(task.isComplete)?
                                                            (
                                                                <Badge pill variant={'dark'} >
                                                                    {task.taskDate}
                                                                </Badge>
                                                            ):''}
                                                            <Badge pill variant={getPriorityDisplay(task.priority).color} className={'float-right'}>
                                                                {getPriorityDisplay(task.priority).text}
                                                            </Badge>
                                                        </ListGroup.Item>
                                                    </Animated>
                                                )
                                            }
                                        </Draggable>
                                        </div>
                                    ):'')
                                }
                                {provided.placeholder}
                            </ListGroup>
                        )
                    }
                </Droppable>
            </div>
        )
    )

}

export default TaskBox;