import { Row,Col} from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';

function DropArea(props){

    return(
        <Droppable droppableId={props.dropId}>
            {
                (provided)=>(
                    <Row style={{'display':'flex',minHeight:'50vh',maxHeight:'50vh',opacity:0.5,zIndex:-10}} 
                        className={props.dropId+" border rounded flex-column-reverse position-static"}
                        {...provided.droppableProps} ref={provided.innerRef}>
                        <Col className={'text-center'} style={{fontWeight:150,fontSize:'8vh'}}>
                            {props.title}
                        </Col>
                        <Row style={{minHeight:'20vh'}}></Row>
                        {provided.placeholder}
                    </Row>
                )
            }
        </Droppable>
    )

}

export default DropArea;