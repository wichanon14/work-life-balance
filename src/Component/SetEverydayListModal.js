import { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";

const SetEverydayListModal = (props)=>{

    const [ everydayList, setEverydayList ] = useState([])
    const [ popModal, setPopModal ] = useState(false)
    const [ taskName, setTaskName ] = useState(null)

    useEffect(()=>{
        setPopModal(props.show)   
    },[props.show])

    useEffect(()=>{
        console.log(taskName);
    },[taskName])

    return(
        <Modal show={popModal} onHide={()=>{props.setHide(false)}}>
            <Modal.Header closeButton>
                <Modal.Title> Everyday List Setting</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{minHeight:'50vh'}} className={'border'}>
                <input type="text" className={'form-control'} 
                onChange={(e)=>{setTaskName(e.target.value)}}/>
            </Modal.Body>
        </Modal>
    )

}

export default SetEverydayListModal;