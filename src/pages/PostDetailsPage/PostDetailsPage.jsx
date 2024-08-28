import heart from './../../assets/heart.svg'
import heartFill from './../../assets/heart-fill.svg'
import calendarCheck from './../../assets/calendar-check.svg'
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
  })

  // TODO: RESEARCH HOW TO FORCE COLLAPSE ON SUBMIT COMMENT
  const [accordionCollapse, setAccordionCollapse] = useState(false)

  const { loggedUser, isLoading } = useContext(AuthContext)

  const navigate = useNavigate()

  const fetchPostDetails = () => {

    postsServices
      .getPost(postId)
      .then(({ data }) => {
        setPostData({ ...data })
      })
      .catch((err) => console.log(err))
  }

  const handleDeletePost = () => {

    postsServices
      .deletePost(postId)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPostDetails()
  }, [])

  useEffect(() => setAccordionCollapse(false), [fetchPostDetails])


  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          {isLoading && <LoadingSpinner />}
          <Card className="shadow text-bg-light">
            <div className="d-flex justify-content-between p-3">
              <UserInfo owner={postData.owner} />
              {/* TODO: Create component */}
              <span className='d-flex align-items-center gap-2'>
                {postData.likes.length} <img src={!postData.likes || !postData.likes.length ? heart : heartFill} alt="Like" style={{ width: "20px" }} />
              </span>
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
            <hr className="my-0" />
            <Card.Footer className="py-3 px-0">
              <p className="px-3">Comments:</p>
              <Stack>
                {
                  loggedUser &&
                  <Accordion flush data-bs-theme="light">
                    <Accordion.Item eventKey={0} in={accordionCollapse} onClick={() => setAccordionCollapse(!accordionCollapse)}>
                      <Accordion.Header>Write a comment</Accordion.Header>
                      <Accordion.Body>
                        <CommentForm fetchPostDetails={fetchPostDetails} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                }
              </Stack>

            </Card.Footer>

          </Card >
        </Col>
      </Row>
    </Container>
  )
}

export default PostDetailsPage