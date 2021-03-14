import { useState } from 'react';
import { Form,Row,Col,Button } from 'react-bootstrap';
import { signin } from '../action'
import { useDispatch } from 'react-redux'

const Authentication = () =>{
    
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const submit = ()=>{

        dispatch( signin({
            username: username,
            password: password
        }) )

    }

        return (
            <div className={'container d-flex flex-column'} style={{marginTop:'30vh'}}>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form.Control type="text" placeholder="Username"
                            className={'text-center'}
                            onChange={(e)=>setUsername(e.target.value)} 
                            onKeyPress={(e)=>(e.key==='Enter')} />
                    </Col>
                    <Col></Col>
                </Row>
                <Row style={{marginTop:'5vh'}}>
                    <Col></Col>
                    <Col>
                        <Form.Control type="password" placeholder="Password"
                            className={'text-center'}
                            onChange={(e)=>setPassword(e.target.value)} 
                            onKeyPress={(e)=>(e.key==='Enter')} />
                    </Col>
                    <Col></Col>
                </Row>
                <Row style={{marginTop:'5vh'}}>
                    <Col></Col>
                    <Button onClick={()=>{submit()}}>Submit</Button>
                    <Col></Col>
                </Row>
            </div>
        )
    

}


export default Authentication;