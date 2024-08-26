import './PostCard.css'
import { Button, Card, Col, Row } from "react-bootstrap"
import CostumCarousel from "../Carousel/Carousel"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ owner, images, _id }) => {

  const { nick, avatar } = owner

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

  return (

    <Card className="justify-content-center">
      {getCardImages()}
      <Card.Body>
        <Card.Text>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://via.placeholder.com/150"
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

          {
            loggedUser &&
            <span className='d-flex justify-content-end'>
              <Button variant='dark' as={Link} to={`/post/${_id}`} >Details</Button>
            </span>
          }

        </Card.Text>
      </Card.Body>


    </Card>

  )
}

export default PostCard

