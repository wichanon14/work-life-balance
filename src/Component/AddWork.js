import React, { useState,useEffect } from 'react';
import { Form,Button,Row,Col,InputGroup,DropdownButton,Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createTask,fetchTask,selectGroupGlobal,fetchDailyTask } from '../action';
import { searchPriority } from '../master';
import { useSelector } from 'react-redux';
import DailyList from './DailyList';
import WeeklyDayPicker from './WeeklyDayPicker';

function AddWork(){

    const [task,setTask] = useState('');
    const [groups,setGroups] = useState([]);
    const [groupSelect,setGroupSelect] = useState({
        id:null,
        groupName:'DailyList'
    });
    const dispatch = useDispatch();
    const textForm = React.useRef();
    const groupList = useSelector(state=>state.groups)
    const dailyStore = useSelector(state=>state.dailyList)

    useEffect(() => {
        setGroups(groupList.groupList);
        if( groupList.groupList.length > 0){
            let groupData = [{
                id:null,
                groupName:'DailyList'
            }, ...groupList.groupList];
            setGroups(groupData);
        }
      }, [groupList,groupSelect])

    const submitTask = ()=>{
        let taskObj = searchPriority(task);
        dispatch(createTask({
            task:taskObj.task,
            priority:taskObj.priority,
            group:groupSelect.id,
            date:dailyStore.currentDateSelect
        }));
        setTimeout(() => {
            dispatch(fetchTask(dispatch,{
                id:groupSelect.id
            }))
            dispatch(fetchDailyTask(dispatch,dailyStore.currentDateSelect))
        }, 200);
        
        dispatch(selectGroupGlobal(groupSelect));

        // clear input after press 'Enter'
        textForm.current.value = '';
        setTask('');
    }
    
    return(
        <div>
            <Row>
                <Col></Col>
            </Row>
            <h1>Daily Task</h1>
            <WeeklyDayPicker />
            <DailyList />
            <Row></Row>
            <InputGroup style={{marginTop:'8%'}}>
                <DropdownButton
                    variant="outline-secondary"
                    title={( groupSelect && groupSelect.groupName )?groupSelect.groupName:'Group'}
                    >
                    {
                        groups.filter((group)=>group.groupName!=='+').map((group,i)=>{
                            return (
                                <Dropdown.Item value={group.id} key={i} onClick={()=>setGroupSelect(group)}>{group.groupName}</Dropdown.Item>
                            )
                        })
                    }    
                </DropdownButton>
                <Form.Control type="text" placeholder="Task Name"
                    onChange={(e)=>setTask(e.target.value)} 
                    onKeyPress={(e)=>(e.key==='Enter')?submitTask():''} ref={textForm}/>
            </InputGroup>
            <Row style={{marginBottom:'5%'}}>
                <Col xs={9}></Col>
                <Button onClick={()=>submitTask()}>Create Task</Button>
            </Row>
            
        </div>
    )
}

export default AddWork;