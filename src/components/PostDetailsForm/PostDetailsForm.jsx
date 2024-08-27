import postsServices from "../../services/posts.services"
import { useContext, useEffect, useState } from "react"
import { Form, Row, Col, Button, FormCheck, Spinner } from "react-bootstrap"
import DatePicker from "react-date-picker"
import { useNavigate, useParams } from "react-router-dom"
import NewImageForm from "../NewImageForm/NewImageForm"
import { AuthContext } from "../../contexts/auth.context"


const PostDetailsForm = () => {

  const { postId } = useParams()

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

  const [isLoadingData, setIsLoadingData] = useState(false)

  const [imageData, setImageData] = useState([])

  const navigate = useNavigate()

  const fetchPostData = () => {

    postsServices
      .getPost(postId)
      .then(({ data }) => {
        setPostData({ ...data })

        const categories = { ...categoriesClicked }

        for (const [key] of Object.entries(categoriesClicked)) {
          if (data.categories.includes(key)) {
            categories[key] = true
          }
        }

        setCategoriesClicked({ ...categories })
      })
      .catch(err => console.log(err))
  }

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

  const handlePostSubmit = e => {
    e.preventDefault()

    setIsLoadingData(true)

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = { ...postData, categories }

    postsServices
      .editPost(postId, data)
      .then(() => {
        setIsLoadingData(false)
        fetchPostData()
      })
      .catch(err => console.log(err))
  }

  const handleDeletePost = postId => {
    if (confirm("Are you sure? ")) {

      postsServices
        .deletePost(postId)
        .then(() => navigate('/'))
        .catch(err => console.log(err))
    }
  }

  const populateImageData = () => {
    setPostData({ ...postData, images: imageData })
  }

  useEffect(() => {
    populateImageData()
  }, [imageData])

  useEffect(() => {
    fetchPostData()
  }, [])

  return (
    <Form onSubmit={handlePostSubmit}>

      <Row className="mb-3">
        {/* TODO: refactor the NewImageForm to show the fetch images  */}
        {/* <NewImageForm setImageData={setImageData} imageData={imageData} /> */}

        <Form.Group as={Col} sm={12} className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control className="mb-2" rows={3} as="textarea" value={postData.description} name="description" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group as={Col} md={4} className="mb-3" controlId="date">
          <Form.Label>Date*</Form.Label>
          <Form.Control as={DatePicker} value={postData.date} name="date" onChange={handleDatePost} required />
        </Form.Group >


        <Form.Group className="mb-3" as={Col} md={8}>
          <Form.Label className="mb-3">Categories</Form.Label>

          <FormCheck inline label="Food" name="Food" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Food} />
          <FormCheck inline label="Technology" name="Technology" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Technology} />
          <FormCheck inline label="Nature" name="Nature" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Nature} />
          <FormCheck inline label="Lifestyle" name="Lifestyle" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Lifestyle} />

        </Form.Group>

      </Row>

      {
        isLoadingData
          ?
          <Button variant="success" className="w-100" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            <span>Loading...</span>
          </Button>
          :
          <Button variant="success" className="w-100" type="submit">Submit</Button>
      }

      <div className="p-3 mt-3 danger-container bg-danger text-center rounded w-100" >
        <Button variant="danger" onClick={handleDeletePost} >Delete Post</Button>
      </div>
    </Form >
  )
}

export default PostDetailsForm