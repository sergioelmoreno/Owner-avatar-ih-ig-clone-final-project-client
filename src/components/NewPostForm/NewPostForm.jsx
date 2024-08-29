import { useEffect, useState } from "react"
import { Form, Row, Col, Button, FormCheck, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-date-picker"
import postsServices from "../../services/posts.services"
import UploaderMultipleImagesForm from "../UploaderMultipleImagesForm/UploaderMultipleImagesForm"
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"


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

  const [addressData, setAddressData] = useState({
    address: undefined,
    latitude: 0,
    longitude: 0
  })

  const [addressValue, setAddressValue] = useState()

  const categories = ['Lifestyle', 'Shopping', 'Technology', 'Food', 'Music', 'Nature', 'Skyline']
  const navigate = useNavigate()

  const GEOCODING_API_KEY = import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY

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

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const data = {
      ...postData,
      images: [...imageData],
      categories,
      longitude: addressData.longitude,
      latitude: addressData.latitude,
      address: addressValue.label
    }

    postsServices
      .savePost(data)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    handleAutocomplete()
  }, [addressValue])

  return (
    <Form onSubmit={handlePostSubmit}>
      <Row className="mb-3">

        <UploaderMultipleImagesForm setImageData={setImageData} imageData={imageData} labelText={'Upload 3 photos max'} />

        <Col sm={{ span: 12 }}>
          <Form.Group className="mb-3">
            <Form.Label>Description*:</Form.Label>
            <Form.Control className="mb-2" rows={3} as="textarea" value={postData.description} name="description" onChange={handleInputChange} required />
          </Form.Group>
        </Col>

        <Col md={{ span: 4 }}>
          <Form.Group className="mb-3">
            <Form.Label>Date:*</Form.Label>
            <Form.Control as={DatePicker} value={postData.date} name="date" onChange={handleDate} required />
          </Form.Group >
        </Col>

        <Col md={{ span: 8 }}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-3">Categories:</Form.Label>
            <Stack direction="horizontal" gap={3}>
              {
                categories.map((cat, idx) => {
                  return <FormCheck key={`cat-${postData._id}-${idx}`} inline id={cat} label={cat} name={cat} type="checkbox" onChange={handleCheckboxChange} />
                })
              }

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

        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Button variant="success" type="submit" className="w-100">Create new post</Button>
        </Col>

      </Row>
    </Form >
  )
}

export default NewPostForm