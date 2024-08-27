import './PostCard.css'
import { Button, Card } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import CardImages from '../CardImages/CardImages'
import { Link } from 'react-router-dom'
import UserInfo from '../UserInfo/UserInfo'

const PostCard = ({ owner, images, _id, handleDeletePost }) => {

  const { _id: ownerId } = owner


  const { loggedUser } = useContext(AuthContext)

  return (

    <Card className='PostCard shadow text-bg-light'>
      {
        images && <CardImages images={images} postId={_id} />
      }
      <Card.Body>
        <Card.Subtitle className='mb-3'>
          <UserInfo owner={owner} />
          {/* TODO: Add likes */}
        </Card.Subtitle>
        <div className='d-flex justify-content-between'>

          {loggedUser?._id === ownerId && <Button variant='danger' onClick={() => handleDeletePost(_id)}>Delete</Button>}

          {loggedUser && <Button variant='success' as={Link} to={`/posts/post/${_id}`} >Details</Button>}

        </div>
      </Card.Body>


    </Card>

  )
}

export default PostCard

