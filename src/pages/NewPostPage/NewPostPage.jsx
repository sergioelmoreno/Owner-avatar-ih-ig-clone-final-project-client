import { Container } from "react-bootstrap"
import NewPostForm from "../../components/NewPostForm/NewPostForm"

const NewPostPage = () => {

  return (
    <Container>
      <h1>New post</h1>
      <hr />
      <NewPostForm />
    </Container>
  )
}

export default NewPostPage