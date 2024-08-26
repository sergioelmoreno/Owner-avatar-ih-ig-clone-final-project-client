import postsServices from "../../services/posts.services"
import { useEffect, useState } from "react"
import { Form, FormControl, FormGroup, FormLabel, FloatingLabel, Row, Col, Button, FormCheck } from "react-bootstrap"
import DatePicker from "react-date-picker"
import { useNavigate } from "react-router-dom"
import NewImageForm from "../NewImageForm/NewImageForm"


const NewPostForm = () => {

  const [postData, setPostData] = useState({
    images: [],
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

  const [imageData, setImageData] = useState([])

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

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = { ...postData, categories }

    postsServices
      .savePost(data)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  const populateImageData = () => {
    setPostData({ ...postData, images: imageData })
  }

  useEffect(() => {
    populateImageData()
  }, [imageData])

  return (
    <Form onSubmit={handlePostSubmit}>

      <Row className="mb-3">

        <NewImageForm setImageData={setImageData} imageData={imageData} />

        <Form.Group as={Col} sm={12} className="mb-3">

          <Form.Label>
            Description:
          </Form.Label>

          <Form.Control className="mb-2" rows={3} as="textarea" value={postData.description} name="description" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group as={Col} md={4} className="mb-3" controlId="date">
          <Form.Label>Date*</Form.Label>
          <Form.Control as={DatePicker} value={postData.date} name="date" onChange={handleDatePost} required />
        </Form.Group >


        <Form.Group className="mb-3" as={Col} md={8}>
          <Form.Label className="mb-3">Categories</Form.Label>
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
          <Button variant="success" type="submit">Create new post</Button>
        </div>
      </Row>
    </Form >
  )
}

export default NewPostForm