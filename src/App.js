import { Row,Container,Col,Button } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import WeeklyDayPicker from './Component/WeeklyDayPicker';
import DailyList from './Component/DailyList';
import WorkList from './Component/WorkList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector,useDispatch } from 'react-redux';
import { triggerDailyDropArea, updateTask, fetchDailyTask, triggerTaskDropArea,fetchTask } from './action';
import Authentication from './Component/Authentication'
import SetEverydayListModal from './Component/SetEverydayListModal';
import axios from 'axios';

function App() {
  
  const [dailyList,setDailyList] = useState([]);
  const [tasks,setTasks] = useState([])
  const [taskListOrder,setTaskListOrder] = useState(tasks);
  const [dragflag,setDragFlag] = useState(false);
  const tasksRetrieve = useSelector(state=>state.tasks)
  const dailyStore = useSelector(state=>state.dailyList);
  const userData = useSelector(state=>state.userData);
  const groupStore = useSelector(state=>state.groups);
  const [dailyListOrder,setDailyListOrder] = useState(dailyList);
  const [displayEverydayPopup, setDisplayEverydayPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    setTasks(tasksRetrieve.taskList)
    setTaskListOrder(tasksRetrieve.taskList);
  },[tasksRetrieve])

  useEffect(()=>{
        
    if(dailyStore){
        setDailyList(dailyStore.dailyList);
        setDailyListOrder(dailyStore.dailyList);
    }
          
  },[dailyStore]);

  function handleOnDragEnd(result) {

    if (!result.destination) {
        console.log("destination empty");
        return
    }

    if (result.destination){
      
      if (result.destination.droppableId === "dailyLists" && result.source.droppableId === "taskLists"){
        const data = tasks.find((val,index)=>val.id === result.source.index)
        let taskDate = dailyStore.currentDateSelect
        console.log(' TaskDate >> ',taskDate);
        data.taskDate = taskDate;
        dispatch(updateTask(data));

        // rerender 
        const items = Array.from(dailyListOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setDailyListOrder(items);
        
        setTimeout(() => {
          dispatch(fetchTask(dispatch,{id:data.group}))
          dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
        }, 200);
      }else if (result.source.droppableId === "dailyLists" && result.destination.droppableId === "taskLists"){
        const data = dailyList.find((val,index)=>val.id === result.source.index)
        data.taskDate = null;
        if( groupStore.groupSelect )
          data.group = groupStore.groupSelect.id;
        dispatch(updateTask(data));
        
        // rerender 
        const items = Array.from(taskListOrder);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTaskListOrder(items);

        setTimeout(() => {
          dispatch(fetchTask(dispatch,{id:data.group}))
          dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
        }, 200);
      }
      else {
        if( result.destination.droppableId === "dailyLists" ){
          const items = Array.from(dailyListOrder);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          setDailyListOrder(items);
        }else{
          const items = Array.from(taskListOrder);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          setTaskListOrder(items);
        }
        
      }

      dispatch(triggerTaskDropArea(false))
      dispatch(triggerDailyDropArea(false));
    }
    setDragFlag(false);
    return;
    
  }

  const setTempFixedDragCardFromDailyToTaskList = (result)=>{
    console.log('result >> ',result);
    if(result.source.droppableId === "dailyLists"){
      setDragFlag(true)
    }
  }

  const generateEverydayList = ()=>{

    // set data
    var body = JSON.stringify(
    {
        "action":"generateEverydayList",
        "payload":{
            "taskDate": dailyStore.currentDateSelect
        }
    });

    // set config
    var config = {
      method: 'post',
      url: 'http://localhost/work-life-balance-api/',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : body
    };

    axios(config).then( (response)=>{
        console.log(response);
    }).catch(function (error) {
        console.error(error);
    });

  }

  return (
      (userData.signinStatus)?
      (
        <Container className={'d-flex flex-column'} 
          style={{flex:1,minHeight:'80vh',marginTop:'2%',overflow:'hidden'}} >
            <Row >
              <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={setTempFixedDragCardFromDailyToTaskList}>
              <Col xs={6}>
                <Row>
                  <Col xs={4}><h2>Daily Task</h2></Col>
                  <Col xs={4}>
                    <Button variant="dark" size="sm" onClick={()=>setDisplayEverydayPopup(true)}>SET Everyday List</Button>
                  </Col>
                  <Col xs={4}>
                    <Button variant="dark" size="sm" onClick={()=>generateEverydayList()}>Generate Everyday List</Button>
                  </Col>
                </Row>
                <WeeklyDayPicker />
                <DailyList />
              </Col>
              <Col xs={6} style={(dragflag)?{'position':'static','zIndex':-10}:{}}>
                <WorkList />
              </Col>
              </DragDropContext>
            </Row>
            <SetEverydayListModal show={displayEverydayPopup} setHide={setDisplayEverydayPopup} />
        </Container>
      ):
      (
        <Authentication />
      )
  );
}

export default App;
