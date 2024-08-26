import postsServices from "../../services/posts.services"
import { useState } from "react"
import { Form, FormControl, FormGroup, FormLabel, FloatingLabel, Row, Col, Button, FormCheck } from "react-bootstrap"
import DatePicker from "react-date-picker"
import { useNavigate } from "react-router-dom"


const NewPostForm = () => {

  const [postData, setPostData] = useState({
    images: '',
    description: '',
    categories: [],
    date: new Date()
  })

  const [categoriesClicked, setCategoriesClicked] = useState({
    Food: false,
    Nature: false,
    Technology: false,
    Lifestyle: false
  })

  const handleInputChange = e => {
    const { value, name } = e.target
    setPostData({ ...postData, [name]: value })
  }

  const handleCheckboxChange = e => {
    const { checked, name } = e.target
    setCategoriesClicked({ ...categoriesClicked, [name]: checked })
  }

  const handleDatePost = date => {
    setPostData({ ...postData, date })
  }

  const navigate = useNavigate()

  const handlePostSubmit = e => {

    e.preventDefault()

    const images = postData.images.trim().split(',')
    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = { ...postData, images, categories }

    postsServices
      .savePost(data)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }



  return (
    <Form onSubmit={handlePostSubmit}>

      <Row className="mb-3">
        <Form.Group as={Col} sm={12} className="mb-3" controlId="images">
          <FloatingLabel
            controlId="images"
            label="Images"
            className="mb-3">
            <Form.Control
              type="images"
              value={postData.images}
              name="images"
              placeholder="images"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>


        <Form.Group as={Col} sm={12} className="mb-3" controlId="description">

          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >

            <FormControl className="mb-2" as="textarea" rows={3}
              type="textarea"
              value={postData.description}
              name="description"
              placeholder="Description id"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3" controlId="date">
          <FormLabel>Date</FormLabel>
          <div>
            <DatePicker value={postData.date} name="date" onChange={handleDatePost} />
          </div>

        </Form.Group >


        <Form.Group className="mb-3" as={Col} md={6}>
          <FormLabel className="mb-3">Categories</FormLabel>
          <div>
            <FormCheck
              inline
              label="Food"
              name="Food"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Technology"
              name="Technology"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Nature"
              name="Nature"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Lifestyle"
              name="Lifestyle"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
          </div>
        </Form.Group>
        <div className="d-grid">
          <Button variant="dark" type="submit" size="sm">Create new post</Button>
        </div>
      </Row>
    </Form>
  )
}

export default NewPostForm