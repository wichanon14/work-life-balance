import { useState,useEffect } from 'react';
import { ListGroup,Row,Col,Badge,Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Animated} from "react-animated-css";
import { updateTask,fetchTask } from '../action';
import { useDispatch } from 'react-redux';
import GroupComponent from './GroupComponent';
import '../css/index.css';

function WorkList(){

    const [tasks,setTasks] = useState([])
    const [shouldSort,setShouldSort]=useState(false)
    const [showAll,setShowAll] = useState(false)
    const [groupSelect,setGroupSelect] = useState({})
    const tasksRetrieve = useSelector(state=>state.tasks)
    const groupList = useSelector(state=>state.groups)
    const dispatch = useDispatch();

    const compare = (a,b)=>{
        if( a.priority > b.priority)
            return 1
        if( a.priority < b.priority)
            return -1
        return 0
    }

    useEffect(()=>{
        if(JSON.stringify(groupList.groupSelect) !== JSON.stringify(groupSelect)){
            setGroupSelect(groupList.groupSelect)
            
        }
        setTasks(tasksRetrieve.taskList);  
        if(shouldSort){
            setTasks(tasksRetrieve.taskList.sort(compare));
            setShouldSort(false);
        } 
    },[tasksRetrieve,tasks,shouldSort,groupList,groupSelect])

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

    const completeTask = (task)=>{
        task.isComplete = !task.isComplete;
        dispatch(updateTask(task));
        console.log('task >> ',task);
        setTimeout(() => {
            dispatch(fetchTask(dispatch,{
                id:task.group
            }))
        }, 100);
    }

    
    
    return(
        <div>
            <Row>
                <Col xs={7} >
                    <p className="h1">Tasks Queue</p>
                </Col>
                <Col>
                    <Button onClick={()=>{
                        dispatch(fetchTask(dispatch,groupSelect))
                    }} >
                        Reload
                    </Button>
                </Col>
                <Col>
                    <Button onClick={()=>setShowAll(!showAll)} >
                        Show All
                    </Button>
                </Col>
            </Row>
            <Row>
                <GroupComponent />
            </Row>
            <div>
                <div style={{minHeight:'50vh',maxHeight:'50vh',overflowY:'auto',overflowX:'hidden'}} className={'d-flex flex-column-reverse border rounded scrollBar'}>
                    {
                        (tasks.length === 0)?(
                            <Row style={{minHeight:'25vh',maxHeight:'25vh'}}>
                                <Col className={'text-center'}>
                                    No Task
                                </Col>
                            </Row>
                        ):''
                    }
                    <ListGroup style={{'display':(shouldSort)?'none':'flex'}}>
                        {
                            tasks.map((task,i)=>((!task.isComplete||showAll)&& task.group === groupSelect.id)?
                                (
                                    <Animated animationIn={(tasks.length-1 === i)?"bounceInLeft":''} 
                                        animationInDuration={500} isVisible={true} >
                                        <ListGroup.Item key={task.id+i}  className={'rounded'} onClick={()=>completeTask(task)} 
                                            style={{'opacity':(task.isComplete)?0.5:1}}>
                                            <input type="checkbox" checked={task.isComplete} onChange={()=>{''}}
                                                style={{'marginRight':'1vw','transform':'scale(1.2)'}}/>
                                            {'TASK-'+task.id+' '+task.taskName}
                                            <Badge pill variant={getPiorityDisplay(task.priority).color} className={'float-right'}>
                                                {getPiorityDisplay(task.priority).text}
                                            </Badge>
                                        </ListGroup.Item>
                                    </Animated>
                                ):''
                            ).reverse()
                        }
                    </ListGroup>
                </div>
            </div>
            <Row>
                <Col xs={8}></Col>
                <Col>        
                    <Button style={{'marginTop':'3%'}} 
                        onClick={()=>setShouldSort(true)}  >
                        Sort By Priority
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default WorkList;