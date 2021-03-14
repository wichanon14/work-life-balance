import { useState,useEffect } from 'react';
import { Row,Col, ListGroup,Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from "react-animated-css";
import { updateTask,fetchDailyTask,triggerTaskDropArea } from '../action';
import { getPriorityDisplay } from '../master'
import DropArea from './DropArea';
import { Draggable,Droppable } from 'react-beautiful-dnd';

function DailyList(){

    const [dailyList,setDailyList] = useState([]);
    const [showDropArea,setShowDropArea] = useState(false);
    const dailyStore = useSelector(state=>state.dailyList);
    const [dailyListOrder,setDailyListOrder] = useState(dailyList);
    const [clearTime,setClearTime] = useState(setTimeout(()=>{},1));
    const dispatch = useDispatch();

    useEffect(()=>{
        
        if(dailyStore){
            setDailyList(dailyStore.dailyList);
            setDailyListOrder(dailyStore.dailyList);
        }
            
    },[dailyStore]);

    useEffect(()=>{
        setShowDropArea(dailyStore.showDailyDropArea);
    },[dailyStore.showDailyDropArea])
    
    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;

        dispatch(updateTask(task));
        
        //fetch daily list
        setTimeout(() => {
            dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
        }, 200);
    }

    const handleOnDrage = (event)=>{

        if( event.nativeEvent.which !== 3 ){

            let a = setTimeout(()=>{                
                dispatch(triggerTaskDropArea(true));
            },100);
    
            setClearTime(a);

        }

        
        
    }

    const clearHandleOnDrag = ()=>{
        clearTimeout(clearTime);
        dispatch(triggerTaskDropArea(false));
    }


    return (
        (showDropArea)?
        (<DropArea dropId="dailyLists" title="Drop To Daily Here"/>):
        (
            <Droppable droppableId="dailyLists">
                {
                    (provided) =>(dailyList.length === 0)?(
                        <Row style={{'display':'flex',minHeight:'50vh',maxHeight:'50vh',opacity:0.5,zIndex:-10}} 
                            className={"dailyLists border rounded flex-column-reverse position-static"}
                            {...provided.droppableProps} ref={provided.innerRef}>
                            <Col className={'text-center'} style={{fontWeight:150,fontSize:'8vh'}}>
                                No Task
                            </Col>
                            <Row style={{minHeight:'20vh'}}></Row>
                            {provided.placeholder}
                        </Row>
                        ):(
                        <div className={''} >
                            <ListGroup style={{'display':'flex',minHeight:'50vh',
                                maxHeight:'50vh',overflowY:'auto',overflowX:'hidden'}} 
                                className="dailyLists flex-column-reverse border rounded scrollBar" 
                                {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    dailyListOrder.map((task,i)=>
                                    (
                                        <div key={task.id} style={{'opacity':(task.isComplete)?0.5:1}}>
                                        <Draggable key={task.id} draggableId={task.id+""} index={i}>
                                            {
                                                (provided)=>(
                                                    <Animated 
                                                        animationInDuration={500} isVisible={true}>
                                                        <ListGroup.Item className={'rounded'} onClick={()=>completeTask(task)} 
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            onMouseDown={(e)=>handleOnDrage(e)} onMouseUp={(e)=>clearHandleOnDrag()}>
                                                            <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                                                style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                                            {'TASK-'+task.id+' '+task.taskName}
                                                            {
                                                                (task.isComplete)?
                                                                (
                                                                    <Badge pill variant={'dark'} style={{marginLeft:'3%'}}>
                                                                        {task.update_date.split(' ')[1].substr(0,5)}
                                                                    </Badge>
                                                                ):''
                                                            }
                                                            <Badge pill variant={getPriorityDisplay(task.priority).color} className={'float-right'}>
                                                                {getPriorityDisplay(task.priority).text}
                                                            </Badge>
                                                        </ListGroup.Item>
                                                    </Animated>
                                                )
                                            }
                                        </Draggable>
                                        </div>
                                    ))
                                }
                                {provided.placeholder}
                            </ListGroup>
                        </div>
                    )
                }
            </Droppable>
        )
    )
}

export default DailyList;