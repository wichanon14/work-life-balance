import { useEffect, useState, useRef } from "react";
import { Button, Modal, Row, Col, ListGroup, InputGroup  } from "react-bootstrap";
import axios from 'axios'

const SetEverydayListModal = (props)=>{

    const [ everydayList, setEverydayList ] = useState([])
    const [ popModal, setPopModal ] = useState(false)
    const [ taskName, setTaskName ] = useState(null)
    const inputRef = useRef();

    useEffect(()=>{
        setPopModal(props.show)   
        if( props.show ){
            getEveryDayList();
        }
    },[props.show])

    const getEveryDayList = ()=>{
        axios.get('http://localhost/work-life-balance-api/?action=getEverydayList').then(
            response=>{
                if(response.data){
                    setEverydayList(response.data);
                }
            }
        )
    }

    const createEveryDayList = ()=>{
        
        // set data
        var body = JSON.stringify(
            {
                "action":"createEverydayList",
                "payload":{
                    "taskName": taskName
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
            getEveryDayList();
        }).catch(function (error) {
            console.error(error);
        });

    }

    const enterToList = ()=>{

        createEveryDayList();
        inputRef.current.value = "";
        setTaskName('');

    }


    return(
        <Modal show={popModal} onHide={()=>{props.setHide(false)}}>
            <Modal.Header closeButton>
                <Modal.Title> Everyday List Setting</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{minHeight:'70vh'}} className={'border'}>
                <Row className={'text-center'}>
                    <Col>
                        <input type="text" className={'form-control'} onChange={(e)=>{setTaskName(e.target.value)}}
                            onKeyPress={(e)=>(e.key==='Enter')?enterToList():''} ref={inputRef} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup style={{'maxHeight':'65vh',overflow:'auto'}} className={'scrollBar'}>
                            {
                                everydayList.map((val,i)=>
                                <ListGroup.Item className={'text-left'}>
                                    <InputGroup.Append>
                                        <Col>
                                            {val}
                                        </Col>
                                        <Button variant="danger" size="sm" >X</Button>
                                    </InputGroup.Append>
                                </ListGroup.Item>)
                            }
                        </ListGroup>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    )

}

export default SetEverydayListModal;