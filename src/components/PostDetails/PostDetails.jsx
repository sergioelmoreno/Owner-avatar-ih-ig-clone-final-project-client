import postsServices from "../../services/posts.services"
import heart from './../../assets/heart.svg'
import heartFill from './../../assets/heart-fill.svg'
import { useEffect, useState } from "react"
import { Card, Row, Col, Button, Container } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { convertDate } from "../../utils/date.utils"
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"

const PostDetails = () => {

  const { postId } = useParams()
  const [postData, setPostData] = useState({})
  const { loggedUser, isLoading } = useContext(AuthContext)

  const fetchPostDetails = () => {

    postsServices
      .getPost(postId)
      .then(({ post }) => {
        setPostData({ ...post })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchPostDetails()
  }, [])

  if (isLoading) {

    return <LoadingSpinner />

  } else {

    return (
      <Row>
        <Col md={{ span: 12 }}>
          <Card className="shadow text-bg-light">
            {
              loggedUser &&
              <span className='d-flex justify-content-end'>
                <Button variant='dark' as={Link} to={`/post/edit/${postId}`} >Edit Post</Button>
              </span>
            }
            <Card.Subtitle className="d-flex justify-content-between p-3">
              <span>
                Date: {convertDate(postData.date)}
              </span>
              <span>
                {/* <img src={!postData.likes || !postData.likes.length ? heart : heartFill} alt="Like" /> {postData.likes.length} */}
              </span>

            </Card.Subtitle>
            <Card.Text className="p-3">
              {postData.description}
            </Card.Text>
            <li>Categories: {postData.categories}</li>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default PostDetails