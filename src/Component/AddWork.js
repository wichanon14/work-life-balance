import React, { useState,useEffect } from 'react';
import { Form,Button,Row,Col,InputGroup,DropdownButton,Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createTask,fetchTask,selectGroupGlobal } from '../action';
import { searchPriority } from '../master';
import { useSelector } from 'react-redux';

function AddWork(){

    const [task,setTask] = useState('');
    const [groups,setGroups] = useState([]);
    const [groupSelect,setGroupSelect] = useState({});
    const dispatch = useDispatch();
    const textForm = React.useRef();
    const groupList = useSelector(state=>state.groups)

    useEffect(() => {
        setGroups(groupList.groupList);
        if( groupList.groupList.length > 0 && JSON.stringify(groupSelect) === JSON.stringify({}) ){
            setGroupSelect(groupList.groupList[0]);           
        }
      }, [groupList,groups,groupSelect])

    const submitTask = ()=>{
        let taskObj = searchPriority(task);
        dispatch(createTask({
            task:taskObj.task,
            priority:taskObj.priority,
            group:groupSelect.id
        }));
        setTimeout(() => {
            dispatch(fetchTask(dispatch,{
                id:groupSelect.id
            }))
        }, 200);
        
        dispatch(selectGroupGlobal(groupSelect));

        textForm.current.value = '';
        setTask('');
    }
    
    return(
        <div>
            <Row>
                <Col></Col>
            </Row>
            <h1>Add Task</h1>
            <InputGroup className="mb-3">
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
                    onChange={(e)=>setTask(e.target.value)} onKeyPress={(e)=>(e.key==='Enter')?submitTask():''} ref={textForm}/>
            </InputGroup>
            <Row>
                <Col xs={9}></Col>
                <Button onClick={()=>submitTask()}>Create Task</Button>
            </Row>
        </div>
    )
}

export default AddWork;