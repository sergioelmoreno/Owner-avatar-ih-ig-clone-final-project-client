import { Col, Container, Row } from "react-bootstrap"
import PostDetailsForm from "../../components/PostDetailsForm/PostDetailsForm"

const EditPostPage = () => {

  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <PostDetailsForm />
        </Col>
      </Row>
    </Container>
  )
}

export default EditPostPage