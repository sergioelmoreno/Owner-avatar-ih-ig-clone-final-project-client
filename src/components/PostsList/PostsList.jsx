import { useEffect, useState } from "react"
import postsServices from "../../services/posts.services"
import { Col, Row } from "react-bootstrap"
import PostCard from "../PostCard/PostCard"

const PostList = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {

    postsServices
      .getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch(err => console.log(err))
  }

  const handleDeletePost = _id => {

    postsServices
      .deletePost(_id)
      .then(() => fetchPosts())
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Row data-masonry='{"percentPosition": true }'>
      {
        posts.map((elm) => {
          return (
            <Col key={elm._id} md={{ span: 6 }} lg={{ span: 4 }} className="mb-3">
              <PostCard {...elm} handleDeletePost={handleDeletePost} />
            </Col>
          )
        })
      }
    </Row >
  )

}
export default PostList