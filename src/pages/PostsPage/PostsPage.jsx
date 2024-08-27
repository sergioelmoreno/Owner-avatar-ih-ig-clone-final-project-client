import PostList from "../../components/PostsList/PostsList"
import { Container } from "react-bootstrap"

const PostsPage = () => {

  return (
    <Container>
      <h1>Welcome PhotoGram!</h1>
      <hr />
      <PostList />
    </Container>
  )
}

export default PostsPage