import { Col, Container, Row } from "react-bootstrap"
import PostDetailsForm from "../../components/PostDetailsForm/PostDetailsForm"

const EditPostPage = () => {

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <PostDetailsForm />
        </Col>
      </Row>
    </Container>
  )
}

export default EditPostPage