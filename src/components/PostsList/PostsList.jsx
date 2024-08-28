import './PostsList.css'
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import postsServices from "../../services/posts.services"
import PostCard from "../PostCard/PostCard"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const PostList = () => {

  const [posts, setPosts] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  const fetchPosts = () => {

    setLoadingData(true)

    postsServices
      .getAllPosts()
      .then(({ data }) => {
        setPosts(data)
        setLoadingData(false)
      })
      .catch(err => console.log(err))
  }

  const handleDeletePost = _id => {
    if (confirm("Are you sure?")) {

      postsServices
        .deletePost(_id)
        .then(() => fetchPosts())
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Row data-masonry='{"percentPosition": true }'>
      <>
        {
          loadingData
            ?
            <LoadingSpinner />
            :

            posts.map((elm) => {
              return (
                <Col key={elm._id} md={{ span: 6 }} lg={{ span: 4 }} className="mb-3">
                  <PostCard {...elm} handleDeletePost={handleDeletePost} />
                </Col>
              )
            })
        }
      </>
    </Row >
  )

}
export default PostList