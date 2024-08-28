import { useState } from "react"
import { Form, Row, Col, Button, FormCheck, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-date-picker"
import postsServices from "../../services/posts.services"
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

  const handleDate = date => {
    setPostData({ ...postData, date })
  }

  const navigate = useNavigate()

  const handlePostSubmit = e => {
    e.preventDefault()

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = { ...postData, images: [...imageData], categories }

    postsServices
      .savePost(data)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handlePostSubmit}>

      <Row className="mb-3">

        <NewImageForm setImageData={setImageData} imageData={imageData} labelText={'Upload max 3 photos'} max={3} />

        <Form.Group as={Col} sm={12} className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control className="mb-2" rows={3} as="textarea" value={postData.description} name="description" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group as={Col} md={4} className="mb-3">
          <Form.Label>Date*</Form.Label>
          <Form.Control as={DatePicker} value={postData.date} name="date" onChange={handleDate} required />
        </Form.Group >


        <Form.Group className="mb-3" as={Col} md={8}>
          <Form.Label className="mb-3">Categories</Form.Label>
          <Stack direction="horizontal" gap={3}>
            <FormCheck inline id="Food" label="Food" name="Food" type="checkbox" onChange={handleCheckboxChange} />
            <FormCheck inline id="Technology" label="Technology" name="Technology" type="checkbox" onChange={handleCheckboxChange} />
            <FormCheck inline id="Nature" label="Nature" name="Nature" type="checkbox" onChange={handleCheckboxChange} />
            <FormCheck inline id="Lifestyle" label="Lifestyle" name="Lifestyle" type="checkbox" onChange={handleCheckboxChange} />
          </Stack>
        </Form.Group>
        <Button variant="success" type="submit">Create new post</Button>
      </Row>
    </Form >
  )
}

export default NewPostForm