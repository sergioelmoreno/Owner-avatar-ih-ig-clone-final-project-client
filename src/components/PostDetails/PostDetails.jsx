import heart from './../../assets/heart.svg'
import heartFill from './../../assets/heart-fill.svg'
import calendarCheck from './../../assets/calendar-check.svg'
import { useEffect, useState } from "react"
import { Card, Button, Badge, Stack } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { convertDate } from "../../utils/date.utils"
import postsServices from "../../services/posts.services"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import CardImages from '../CardImages/CardImages'
import UserInfo from '../UserInfo/UserInfo'

const PostDetails = () => {

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

  const { loggedUser, isLoading } = useContext(AuthContext)

  const fetchPostDetails = () => {

    postsServices
      .getPost(postId)
      .then(({ data }) => {
        setPostData({ ...data })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchPostDetails()
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Card className="shadow text-bg-light">
        <div className="d-flex justify-content-between p-3">
          <UserInfo owner={postData.owner} />
          {/* TODO: Create component */}
          <span className='d-flex align-items-center gap-2'>
            {postData.likes.length} <img src={!postData.likes || !postData.likes.length ? heart : heartFill} alt="Like" style={{ width: "20px" }} />
          </span>
        </div>
        {
          postData.images && <CardImages images={postData.images} postId={postId} position={null} />
        }


        <Card.Subtitle className="d-flex justify-content-between p-3">

          <span className='d-flex align-items-center'>
            <img src={calendarCheck} alt="Date of the pictures" className='me-2' />
            {convertDate(postData.date)}
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
        {

          loggedUser?._id === postData.owner._id &&
          < span className='d-flex justify-content-end'>
            <Button variant='success' as={Link} to={`/post/edit/${postId}`} >Edit Post</Button>
          </span>
        }
      </Card >
    </>
  )

}

export default PostDetails