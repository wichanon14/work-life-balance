import { useState,useEffect } from 'react';
import { Row,Col, ListGroup,Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from "react-animated-css";
import { updateTask,createDailyList } from '../action';
import { getPriorityDisplay } from '../master'
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';

function DailyList(){

    const [dailyList,setDailyList] = useState([]);
    const [shouldSort,setShouldSort]=useState(false)
    const [showAll,setShowAll] = useState(false)
    const dailyStore = useSelector(state=>state.dailyList);
    const [dailyListOrder,setDailyListOrder] = useState(dailyList);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("dailyStore ",dailyStore)
        if(dailyStore){
            setDailyList(dailyStore.dailyList);
            setDailyListOrder(dailyStore.dailyList);
        }
            
    },[dailyStore]);

    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;

        dispatch(updateTask(task));
        
        //fetch daily list
        
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(dailyListOrder);
        console.log('result >> ',items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setDailyListOrder(items);
    }

    return (
        <Droppable droppableId="dailyLists">
            {
                (provided) =>(dailyList.length === 0)?(
                    <Row style={{minHeight:'25vh',maxHeight:'25vh'}} className="dailyLists"
                    {...provided.droppableProps} ref={provided.innerRef}>
                        <Col className={'text-center'}>
                            No Task
                        </Col>
                    </Row>
                    ):(
                    <div className={'d-flex flex-column-reverse border rounded scrollBar'} 
                        style={{moverflowY:'auto',overflowX:'hidden'}}
                        >
                        <ListGroup style={{'display':'flex',minHeight:'50vh',maxHeight:'50vh'}} className="dailyLists flex-column-reverse" 
                            {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                dailyListOrder.map((task,i)=>
                                (
                                    <Draggable key={task.id} draggableId={task.id+""} index={i}>
                                        {
                                            (provided)=>(
                                                <Animated animationIn={"bounceInLeft"} 
                                                    animationInDuration={500} isVisible={true}>
                                                    <ListGroup.Item className={'rounded'} onClick={()=>completeTask(task)} 
                                                        style={{'opacity':(task.isComplete)?0.5:1}}
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                                            style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                                        {'TASK-'+task.id+' '+task.taskName}
                                                        <Badge pill variant={getPriorityDisplay(task.priority).color} className={'float-right'}>
                                                            {getPriorityDisplay(task.priority).text}
                                                        </Badge>
                                                    </ListGroup.Item>
                                                </Animated>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </ListGroup>
                    </div>
                )
            }
        </Droppable>
    )
}

export default DailyList;