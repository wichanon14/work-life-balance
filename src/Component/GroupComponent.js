import { Nav,Row } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { createGroup,selectGroupGlobal,fetchGroup,fetchTask,setGroupForDisplayDaily } from '../action';
import { Animated } from "react-animated-css";
import '../css/index.css';



function GroupComponent(){

    const [groups,setGroups] = useState([]);
    const [groupName,setGroupName] = useState('');
    const [selectGroup,setSelectGroup] = useState({});
    const [isCreateGroup,setIsCreateGroup] =useState(false);
    const groupList = useSelector(state=>state.groups);
    const dispatch = useDispatch();    

    useEffect(()=>{
        setGroups(groupList.groupList); 
        if( JSON.stringify(groupList.groupSelect) === JSON.stringify({}) ){
            setSelectGroup(groupList.groupList[0]); 
        }      
    },[groupList,groups,selectGroup])

    useEffect(()=>{
        setSelectGroup(groupList.groupSelect)
    },[groupList.groupSelect,groupList.groupList,selectGroup])

    const handleSelectTab = (group) =>{
        let key = group.groupName
        if(key === '+'){
            setIsCreateGroup(true);            
        }else{
            dispatch(selectGroupGlobal(group));
            setSelectGroup(group)
            setTimeout(() => {
                dispatch( fetchTask(dispatch,group) )
                dispatch( setGroupForDisplayDaily(group.id) )
            }, 200);
        }
        
    }

    const createNewGroup = () =>{
        dispatch(createGroup({
            groupName:groupName
        }))
        setGroupName('');
        setIsCreateGroup(false);
        setTimeout(()=>{
            getGroup(dispatch);
        },200);
    }

    const getGroup = (dispatch) =>{
        dispatch(fetchGroup(dispatch))
    }

    

    return (
        <div className={'col-sm-12'} >
            {(!isCreateGroup)?
            (
                <Animated key="selectGroup" animationIn={'bounceInRight'} animationInDuration={200} animationOut={'bounceOutLeft'}>
                    <Nav variant="tabs" activeKey={(selectGroup)?selectGroup.groupName:''} className={'scrollBar'}
                        style={{'overflowX':' auto','overflowY':' hidden','flexWrap': 'nowrap'}}>
                    {
                        groups.map((group,i)=>{
                            return (
                                <Nav.Item key={i} onClick={()=>handleSelectTab(group)}>
                                    <Nav.Link eventKey={group.groupName}>{group.groupName}</Nav.Link>
                                </Nav.Item>
                            )}
                        )
                    }
                    </Nav>
                </Animated>
            ):(
                <Nav variant="tabs" activeKey={selectGroup} className={'border rounded col-12'} >
                    <Animated key="createGroup" className={'col-12'} animationIn={'bounceInRight'} animationInDuration={200} animationOut={'bounceOutLeft'}>
                        <Row style={{'marginTop':'2%','marginBottom':'2%'}} >
                        <div className="input-group col-12">
                            <input type="text" onChange={(e)=>{setGroupName(e.target.value)}} className="form-control col-12" placeholder="Group Name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary " onClick={()=>createNewGroup()} type="button">CREATE</button>
                                <button className="btn btn-light btn-outline-secondary" type="button" onClick={()=>setIsCreateGroup(false)}>CANCEL</button>
                            </div>
                        </div>
                        </Row>
                    </Animated>
                </Nav>
            )}
        </div>
    )

}

export default GroupComponent;