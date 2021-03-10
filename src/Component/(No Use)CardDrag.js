import { ListGroup,Row,Col,Badge } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { fetchTask } from '../action';
import { Animated } from "react-animated-css";
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';


function CardDrag(){

    const [tasks,setTasks] = useState([])
    const [shouldSort,setShouldSort]=useState(false)
    const [showAll,setShowAll] = useState(false)
    const [groupSelect,setGroupSelect] = useState({})
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
        setGroupSelect(groupList.groupSelect)
    },[groupList.groupSelect])

    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;
        //dispatch(updateTask(task));
        console.log('task >> ',task);
        setTimeout(() => {
            dispatch(fetchTask(dispatch,{
                id:task.group
            }))
        }, 200);
    }

    const getPiorityDisplay = (priority)=>{
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

    return (
        <DragDropContext >
            <div style={{minHeight:'50vh',maxHeight:'50vh',overflowY:'auto',overflowX:'hidden'}} className={'d-flex flex-column-reverse border rounded scrollBar'}>
            <Droppable droppableId="taskLists">
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
                                tasks.map((task,i)=>((!task.isComplete||showAll)&& task.group === groupSelect.id)?
                                (
                                    <Draggable key={task.id} draggableId={task.id+""} index={i}>
                                        {
                                            (provided)=>(
                                                <Animated animationIn={(tasks.length-1 === i)?"bounceInLeft":''} 
                                                    animationInDuration={500} isVisible={true}>
                                                    <ListGroup.Item className={'rounded'} onClick={()=>completeTask(task)} 
                                                        style={{'opacity':(task.isComplete)?0.5:1}}
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                                            style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                                        {'TASK-'+task.id+' '+task.taskName}
                                                        <Badge pill variant={getPiorityDisplay(task.priority).color} className={'float-right'}>
                                                            {getPiorityDisplay(task.priority).text}
                                                        </Badge>
                                                    </ListGroup.Item>
                                                </Animated>
                                            )
                                        }
                                    </Draggable>
                                ):'')
                            }
                            {provided.placeholder}
                        </ListGroup>
                    )
                }
            </Droppable>
            </div>
        </DragDropContext>
    )

}

export default CardDrag;