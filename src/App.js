import { Row,Container,Col } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import AddWork from './Component/AddWork';
import WorkList from './Component/WorkList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector,useDispatch } from 'react-redux';
import { triggerDailyDropArea, updateTask, fetchDailyTask, triggerTaskDropArea,fetchTask } from './action';

function App() {
  
  const [dailyList,setDailyList] = useState([]);
  const [tasks,setTasks] = useState([])
  const [taskListOrder,setTaskListOrder] = useState(tasks);
  const [dragflag,setDragFlag] = useState(false);
  const tasksRetrieve = useSelector(state=>state.tasks)
  const dailyStore = useSelector(state=>state.dailyList);
  const [dailyListOrder,setDailyListOrder] = useState(dailyList);
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
    if (result.destination){
      
      if (result.destination.droppableId === "dailyLists" && result.source.droppableId === "taskLists"){
        const data = tasks.find((val,index)=>index === result.source.index)
        let taskDate = dailyStore.currentDateSelect
        console.log(' TaskDate >> ',taskDate);
        data.taskDate = taskDate;
        dispatch(updateTask(data));
        setTimeout(() => {
          dispatch(fetchTask(dispatch,{id:data.group}))
          dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
        }, 200);
      }else if (result.source.droppableId === "dailyLists" && result.destination.droppableId === "taskLists"){
        const data = dailyList.find((val,index)=>index === result.source.index)
        data.taskDate = null;
        dispatch(updateTask(data));
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
    if(result.source.droppableId === "dailyLists"){
      setDragFlag(true)
    }
  }

  return (
      <Container className={'d-flex flex-column'} 
        style={{flex:1,minHeight:'80vh',marginTop:'3%',overflow:'hidden'}} >
          <Row >
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={setTempFixedDragCardFromDailyToTaskList}>
            <Col xs={6}>
              <AddWork />
            </Col>
            <Col xs={6} style={(dragflag)?{'position':'static','zIndex':-10}:{}}>
              <WorkList />
            </Col>
            </DragDropContext>
          </Row>
      </Container>
  );
}

export default App;
