import { useState,useEffect } from 'react';
import { Row,Col, ListGroup,Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from "react-animated-css";
import { updateTask,createDailyList } from '../action';

function DailyList(){

    const [dailyList,setDailyList] = useState([]);
    const dailyStore = useSelector(state=>state.dailyList);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("dailyStore ",dailyStore)
        if(dailyStore)
            setDailyList(dailyStore.dailyList);
    },[dailyStore]);

    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;

        dispatch(updateTask(task));
        
        //fetch daily list
        
    }

    return (
        <Row style={{'marginTop':'10%','minHeight': '50vh','maxHeight': '50vh'}}
            className={'d-flex flex-column-reverse border rounded scrollBar'}>
            {
                (dailyList.length === 0)?
                (
                    <Row style={{minHeight:'25vh',maxHeight:'25vh'}}>
                        <Col className={'text-center'}>
                            No Daily Task
                        </Col>
                    </Row>
                ):''
            }
            <ListGroup style={{'display':'flex'}}>
                {
                    dailyList.map((task,i)=>(
                        (
                            <Animated key={task.id} animationIn={(dailyList.length-1 === i)?"bounceInLeft":''} 
                                animationInDuration={500} isVisible={true} >
                                <ListGroup.Item className={'rounded'} onClick={()=>completeTask(task)} 
                                    style={{'opacity':(task.isComplete)?0.5:1}}>
                                    <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                        style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                    {'TASK-'+task.id+' '+task.taskName}
                                    <Badge pill variant={'warning'} className={'float-right'}>
                                        {'daily'}
                                    </Badge>
                                </ListGroup.Item>
                            </Animated>
                        )
                    )).reverse()
                }
            </ListGroup>
        </Row>
    )
}

export default DailyList;