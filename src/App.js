import { Row,Container,Col } from 'react-bootstrap';
import AddWork from './Component/AddWork';
import WorkList from './Component/WorkList';

function App() {
  
  return (
      <Container className={'d-flex flex-column'} style={{flex:1,minHeight:'80vh',marginTop:'5%'}} >
          <Row className={'TaskCreate'} style={{marginBottom:'5%'}}>
            <Col xs={6}>
              <AddWork />
            </Col>
            <Col xs={6}>
              <WorkList />
            </Col>
          </Row>
      </Container>
  );
}

export default App;
