import { Row,Container,Col } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import AddWork from './Component/AddWork';
import WorkList from './Component/WorkList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

function App() {
  
  const [tasks,setTasks] = useState([])
  const [taskListOrder,setTaskListOrder] = useState(tasks);
  const tasksRetrieve = useSelector(state=>state.tasks)

  useEffect(()=>{
    setTasks(tasksRetrieve.taskList)
    setTaskListOrder(tasksRetrieve.taskList);
  },[tasksRetrieve])

  function handleOnDragEnd(result) {
    console.log('result >> ',result);
    if (!result.destination) return;
    const items = Array.from(taskListOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTaskListOrder(items);
  }

  return (
      <Container className={'d-flex flex-column'} 
        style={{flex:1,minHeight:'80vh',marginTop:'3%',overflow:'hidden'}} >
          <Row className={'TaskCreate'} >
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <Col xs={6}>
              <AddWork />
            </Col>
            <Col xs={6}>
              <WorkList />
            </Col>
            </DragDropContext>
          </Row>
      </Container>
  );
}

export default App;
