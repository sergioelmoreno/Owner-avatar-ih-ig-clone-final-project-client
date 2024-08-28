import './PostCard.css'
import heart from './../../assets/heart.svg'
import heartFill from './../../assets/heart-fill.svg'
import { Button, Card, Stack } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CardImages from '../CardImages/CardImages'
import UserInfo from '../UserInfo/UserInfo'

const PostCard = ({ owner, images, _id, likes, handleDeletePost }) => {

  const { _id: ownerId } = owner


  const { loggedUser } = useContext(AuthContext)

  return (

    <Card className='PostCard shadow text-bg-light'>
      {
        images && <CardImages images={images} postId={_id} />
      }
      <Card.Body>
        <Card.Subtitle>
          <Stack direction='horizontal' gap={2}>

            <UserInfo owner={owner} />
            <span className="likes d-flex align-items-center gap-2">
              {likes.length}
              <img src={!likes || !likes.length ? heart : heartFill} alt="Like" style={{ width: "20px" }} />
            </span>

          </Stack>
        </Card.Subtitle>
        <div className='d-flex justify-content-between mt-3'>

          {loggedUser?._id === ownerId && <Button variant='danger' size='sm' onClick={() => handleDeletePost(_id)}>Delete</Button>}

          {loggedUser && <Button variant='success' size='sm' className='ms-auto' as={Link} to={`/posts/post/${_id}`} >Details</Button>}

        </div>
      </Card.Body>


    </Card>

  )
}

export default PostCard

