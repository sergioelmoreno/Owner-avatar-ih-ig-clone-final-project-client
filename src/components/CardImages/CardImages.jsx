import { Card } from "react-bootstrap"
import CostumCarousel from "../Carousel/Carousel"

const CardImages = ({ images, postId }) => {

  return (
    <>
      {
        images.length > 1
          ?
          <CostumCarousel images={images} postId={postId} variant="top" />
          :
          <Card.Img className='imageCard' variant="top" src={images[0]} />
      }
    </>
  )
}

export default CardImages