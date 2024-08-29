import { useEffect, useState } from "react"
import { Form, Row, Col, Button, FormCheck, Spinner, Stack } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import postsServices from "../../services/posts.services"
import DatePicker from "react-date-picker"
import UploaderMultipleImagesForm from "../UploaderMultipleImagesForm/UploaderMultipleImagesForm"
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"

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

  const [addressData, setAddressData] = useState({
    address: undefined,
    latitude: 0,
    longitude: 0
  })

  const [addressValue, setAddressValue] = useState()

  const [imageData, setImageData] = useState([])

  const navigate = useNavigate()

  const GEOCODING_API_KEY = import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY

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

  const handleAutocomplete = () => {
    addressValue?.label && geocodeByAddress(addressValue?.label)
      .then(([addressDetails]) => {
        return getLatLng(addressDetails)
      })
      .then((coordinates) => {
        setAddressData({ ...addressData, latitude: coordinates.lat, longitude: coordinates.lng })
      })
      .catch(error => console.error(error))
  }

  const handlePostSubmit = e => {
    e.preventDefault()

    setIsLoadingData(true)

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = {
      ...postData,
      images: imageData.length > 0 ? [...imageData] : postData.images,
      categories,
      longitude: addressData.longitude,
      latitude: addressData.latitude,
      address: addressValue.label
    }

    postsServices
      .editPost(postId, data)
      .then(() => {
        setIsLoadingData(false)
        navigate(`/posts/post/${postId}`)
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

  useEffect(() => {
    fetchPostData()
  }, [])

  useEffect(() => {
    handleAutocomplete()
  }, [addressValue])

  return (
    <Form onSubmit={handlePostSubmit} className="PostDetailsForm pb-6" encType="multipart/form-data">

      <Row className="mb-3">

        {/* TODO: 🔥🔥refactor to show the fetch images and compress before upload (multer storage)*/}

        <UploaderMultipleImagesForm setImageData={setImageData} imageData={postData.images} labelText={'Upload 3 photos max'} />

        <Col sm={{ span: 12 }}>
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control className="mb-2" rows={3} as="textarea" value={postData.description} name="description" onChange={handleInputChange} required />
          </Form.Group>
        </Col>

        <Col md={{ span: 4 }}>
          <Form.Group className="mb-3">
            <Form.Label>Date*</Form.Label>
            <Form.Control as={DatePicker} value={postData.date} name="date" onChange={handleDatePost} required />
          </Form.Group >
        </Col>

        <Col md={{ span: 8 }}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-3">Categories</Form.Label>
            <Stack direction="horizontal" gap={3}>

              <FormCheck inline id="Food" label="Food" name="Food" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Food} />
              <FormCheck inline id="Technology" label="Technology" name="Technology" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Technology} />
              <FormCheck inline id="Nature" label="Nature" name="Nature" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Nature} />
              <FormCheck inline id="Lifestyle" label="Lifestyle" name="Lifestyle" type="checkbox" onChange={handleCheckboxChange} checked={categoriesClicked.Lifestyle} />

            </Stack>
          </Form.Group>
        </Col>

        <Col md={{ span: 12 }}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-3">Direction:</Form.Label>
            <GooglePlacesAutocomplete selectProps={{
              styles: {
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#212529',
                  borderColor: '#495057'
                }),
                input: (provided) => ({
                  ...provided,
                  color: '#fff',
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: '#212529',
                  color: '#fff',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  backgroundColor: '#212529',
                  color: '#fff',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#212529',
                  border: 'solid 1px #495057',
                  color: '#fff',
                }),
              },
              addressValue,
              onChange: setAddressValue
            }}
              apiKey={GEOCODING_API_KEY}
            />
          </Form.Group>
        </Col>

        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }} className='mt-3'>

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

        </Col>
      </Row>

      <div className="p-3 mt-3 danger-container bg-danger text-center rounded w-100" >
        <Button variant="danger" onClick={handleDeletePost} >Delete Post</Button>
      </div>

    </Form >
  )
}

export default PostDetailsForm