import './PostCard.css'
import { Button, Card, Col, Row } from "react-bootstrap"
import CostumCarousel from "../Carousel/Carousel"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ owner, images, _id, handleDeletePost }) => {

  const { nick, avatar, _id: owner_id } = owner

  const { loggedUser } = useContext(AuthContext)

  const getCardImages = () => {

    if (images.length > 1) {
      return (
        <CostumCarousel images={images} postId={_id} />
      )
    }
    else {
      return (
        <Card.Img className='Imagencard' variant="top" src={images[0]} />
      )
    }
  }

  const showDeleteButton = () => {
    if (owner_id === loggedUser._id) {
      return (
        <Button variant='danger' onClick={() => handleDeletePost(_id)}>Delete</Button>
      )
    }
  }

  return (

    <Card className="justify-content-center">
      {getCardImages()}
      <Card.Body>
        <Card.Text>
          <span className='d-flex align-items-center'>
            <img
              src={avatar}
              alt="User avatar"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px'
              }}
            />
            <span>{nick}</span>
          </span>
        </Card.Text>
        <div className='d-flex justify-content-end'>
          {showDeleteButton()}
          {
            loggedUser &&
            <Button variant='success' as={Link} to={`/posts/post/${_id}`} className='align-self-end' >Details</Button>
          }
        </div>
      </Card.Body>


    </Card>

  )
}

export default PostCard

