import { useEffect, useState } from "react"
import PostList from "../../components/PostsList/PostsList"
import postsServices from "../../services/posts.services"
import { Container } from "react-bootstrap"

const PostsPage = () => {

  const [posts, setPosts] = useState([])

  const fetchPosts = () => {

    postsServices
      .getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <Container>
        <PostList posts={posts} />
      </Container>
    </>
  )
}

export default PostsPage