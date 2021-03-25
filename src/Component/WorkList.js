import { useState,useEffect } from 'react';
import { Row,Col,Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchTask,sortTaskByPriority,showAllStatusTask,fetchDailyTask } from '../action';
import { useDispatch } from 'react-redux';
import GroupComponent from './GroupComponent';
import AddWork from './AddWork';
import TaskBox from './TaskBox';
import '../css/index.css';

function WorkList(){

    const [tasks,setTasks] = useState([])
    const [showAll,setShowAll] = useState(false)
    const [groupSelect,setGroupSelect] = useState({})
    const tasksRetrieve = useSelector(state=>state.tasks)
    const dailyStore = useSelector(state=>state.dailyList)
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
                <Col xs={5} >
                    <p className="h2">Tasks Queue</p>
                </Col>
                <Col>
                    <Button onClick={()=>{
                        dispatch(fetchTask(dispatch,groupSelect))
                        dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
                    }} >
                        Reload
                    </Button>
                </Col>
                <Col>
                    <Button onClick={()=>dispatch(showAllStatusTask(!showAll))}>
                        Show All
                    </Button>
                </Col>
                <Col>        
                    <Button style={{'marginTop':'1%'}} 
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
            <AddWork />
            <Row>
                <GroupComponent />
            </Row>
            <TaskBox />
        </div>
    )
}

export default WorkList;