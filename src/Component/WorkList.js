import { useState,useEffect } from 'react';
import { Row,Col,Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchTask,sortTaskByPriority,showAllStatusTask } from '../action';
import { useDispatch } from 'react-redux';
import GroupComponent from './GroupComponent';
import TaskBox from './TaskBox';
import '../css/index.css';

function WorkList(){

    const [tasks,setTasks] = useState([])
    const [showAll,setShowAll] = useState(false)
    const [groupSelect,setGroupSelect] = useState({})
    const tasksRetrieve = useSelector(state=>state.tasks)
    const groupList = useSelector(state=>state.groups)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(JSON.stringify(groupList.groupSelect) !== JSON.stringify(groupSelect)){
            setGroupSelect(groupList.groupSelect)
        }
        setTasks(tasksRetrieve.taskList);  

    },[tasksRetrieve,tasks,groupList,groupSelect])   
    
    useEffect(()=>{
        setShowAll(tasksRetrieve.showAllStatus) 
    },[tasksRetrieve.showAllStatus]);

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
                    <Button onClick={()=>dispatch(showAllStatusTask(!showAll))}>
                        Show All
                    </Button>
                </Col>
            </Row>
            <Row>
                <GroupComponent />
            </Row>
            <TaskBox />
            <Row>
                <Col xs={8}></Col>
                <Col>        
                    <Button style={{'marginTop':'3%'}} 
                        onClick={()=>{
                            dispatch(sortTaskByPriority(true))
                            setTimeout(()=>{
                                dispatch(sortTaskByPriority(false))
                            },10)
                        }}  >
                        Sort By Priority
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default WorkList;