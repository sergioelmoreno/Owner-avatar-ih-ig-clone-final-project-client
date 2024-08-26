import { Carousel } from "react-bootstrap"
import './Carousel.css'

const CostumCarousel = ({ images, postId }) => {

  return (
    <Carousel className="Carousel" aspectRatio="16x9">
      {
        images.map((eachImage, idx) => {
          return (
            <Carousel.Item key={`carousel-item-${postId}-${idx}`}>
              <img
                className="cardImage"
                src={eachImage}
                alt="slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}

export default CostumCarousel