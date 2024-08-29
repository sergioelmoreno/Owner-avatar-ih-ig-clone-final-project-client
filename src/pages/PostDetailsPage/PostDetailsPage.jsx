import pencilSquare from './../../assets/pencil-square.svg'
import calendarCheck from './../../assets/calendar-check.svg'
import geoAltFill from './../../assets/geo-alt-fill.svg'
import { Accordion, Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Card, Button, Badge, Stack } from "react-bootstrap"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { convertDate } from "../../utils/date.utils"
import postsServices from "../../services/posts.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import CardImages from '../../components/CardImages/CardImages'
import UserInfo from '../../components/UserInfo/UserInfo'
import CommentForm from "../../components/CommentForm/CommentForm"
import CommentsList from '../../components/CommentsList/CommentsList'
import commentsServices from '../../services/comments.services'
import LikesForm from '../../components/Likesform/LikesForm'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

const PostDetailsPage = () => {


  const { postId } = useParams()

  const [postData, setPostData] = useState({
    owner: "",
    images: [],
    description: "",
    date: "",
    comments: [],
    categories: [],
    likes: [],
    address: "",
    location: {}
  })

  const [commentsData, getCommentsData] = useState([])

  const [loadingData, setLoadingData] = useState(false)

  const { loggedUser, isLoading } = useContext(AuthContext)

  const navigate = useNavigate()

  const fetchPostDetails = () => {
    setLoadingData(true)
    postsServices
      .getPost(postId)
      .then(({ data }) => {

        setPostData({ ...data })
        setLoadingData(false)

      })
      .catch((err) => console.log(err))
  }

  const handleDeletePost = () => {

    postsServices
      .deletePost(postId)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  const fetchCommentsDetails = () => {

    commentsServices
      .getCommentsList(postId)
      .then(({ data }) => {
        getCommentsData(data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {

    fetchPostDetails()
    fetchCommentsDetails()

  }, [])


  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>

          {isLoading && loadingData ?
            <LoadingSpinner />
            :
            <Card className="shadow text-bg-light">

              <div className="d-flex justify-content-between p-3">
                <UserInfo owner={postData.owner} />

                {!isLoading && !loadingData && <LikesForm postData={postData} setPostData={setPostData} />}

              </div>

              <hr className="my-0" />

              {
                loggedUser?._id === postData.owner._id &&
                <div className='d-flex justify-content-between p-2'>
                  <Button variant='danger' onClick={handleDeletePost} size='sm'>Delete post</Button>
                  <Button variant='success' as={Link} to={`/posts/edit/${postId}`} size='sm'>Edit Post</Button>
                </div>
              }

              {
                postData.images && <CardImages images={postData.images} postId={postId} position={null} />
              }


              <Card.Subtitle className="d-flex justify-content-between p-3">

                <span className='d-flex align-items-center'>
                  <img src={calendarCheck} alt="Date of the pictures" className='me-2' />
                  <small>
                    {convertDate(postData.date)}
                  </small>
                </span>

                <Stack direction='horizontal' gap={2}>
                  {
                    postData.categories.map((cat, idx) => {
                      return <Badge key={`${postData._id}-${idx}`} bg="secondary">{cat}</Badge>
                    })
                  }

                </Stack>

              </Card.Subtitle>

              <Card.Text className="p-3">
                {postData.description}
              </Card.Text>

              <Accordion flush data-bs-theme="light">
                <Accordion.Item eventKey={1}>
                  <Accordion.Header>

                    <span className='d-flex align-items-center'>
                      <img src={geoAltFill} alt="Location" className='me-2' />
                      <small>
                        {postData.address}
                      </small>
                    </span>

                  </Accordion.Header>
                  <Accordion.Body className='p-0'>
                    {
                      !isLoading && !loadingData && <GoogleMap lng={postData.location.coordinates[0]} lat={postData.location.coordinates[1]} />
                    }
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <hr className="my-0" />

              <Card.Footer className="py-3 px-0">

                <Stack>
                  {
                    loggedUser &&
                    <Accordion flush data-bs-theme="light">
                      <Accordion.Item eventKey={0}>
                        <Accordion.Header>
                          <span className='me-3'><img src={pencilSquare} alt="Write a comment" /></span>
                          <span><strong>Write a comment</strong></span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <CommentForm fetchCommentsDetails={fetchCommentsDetails} />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  }
                </Stack>

                <CommentsList postId={postId} fetchCommentsDetails={fetchCommentsDetails} commentsData={commentsData} />

              </Card.Footer>

            </Card >

          }

        </Col>
      </Row>
    </Container>
  )
}

export default PostDetailsPage