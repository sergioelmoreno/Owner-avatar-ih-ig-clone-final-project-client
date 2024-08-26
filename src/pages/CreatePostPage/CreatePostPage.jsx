import { Container } from "react-bootstrap"
import NewPostForm from "../../components/NewPostForm/NewPostForm"

const CreatePostPage = () => {

  return (
    <Container>
      <h1>Nuevo post</h1>
      <hr />
      <NewPostForm />
    </Container>
  )
}

export default CreatePostPage