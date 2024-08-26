import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { subtractYears } from "../../utils/date.utils"

const ProfileForm = () => {

  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    avatar: "",
    country: "",
    phone: "",
    birth: new Date()
  })

  const fetchProfileData = () => {

    authServices
      .getUserProfile()
      .then(({ data }) => {
        setProfileData({
          firstname: data.firstname,
          lastname: data.lastname,
          nick: data.nick,
          email: data.email,
          avatar: data.avatar,
          country: data.country,
          phone: data.phone,
          birth: data.birth
        })
      })
      .catch(err => console.log(err))
  }

  const handleInputChange = e => {
    const { value, name } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleDatePost = date => {
    setProfileData({ ...profileData, date })
  }

  const handleFormSubmit = event => {
    event.preventDefault()


    authServices
      .updateUserProfile(profileData)
      .then(() => fetchProfileData())
      .catch(err => console.log(err))
  }

  const maxDate = subtractYears(new Date(), 18)

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (

    <Form onSubmit={handleFormSubmit} className="ProfileForm">

      <Container fluid>

        <Row className="mb-3">

          <Col md={6}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={profileData.nick} name="nick" disabled></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={profileData.email} name="email" disabled />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>First name:</Form.Label>
              <Form.Control type="text" value={profileData.firstname} name="firstname" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Last name:</Form.Label>
              <Form.Control type="text" value={profileData.lastname} name="lastname" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Country:</Form.Label>
              <Form.Control type="text" value={profileData.country} name="country" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone:</Form.Label>
              <Form.Control type="text" value={profileData.phone} name="phone" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <div className="d-flex align-items-center">
              <img src={profileData.avatar} alt={profileData.nick} className="flex-1" />
              <Form.Group>
                <Form.Label>Avatar:</Form.Label>
                <Form.Control type="text" value={profileData.avatar} name="avatar" onChange={handleInputChange}></Form.Control>
              </Form.Group>
            </div>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <div>
                <DatePicker value={profileData.birth} name="birth" onChange={handleDatePost} maxDate={maxDate} required />
              </div>
              <Form.Text className="text-muted">
                Restrict to users 18 years and older
              </Form.Text>
            </Form.Group>
          </Col>

        </Row>

        <Button variant="success" className="w-100" type="submit">Submit</Button>

      </Container>

    </Form>
  )
}

export default ProfileForm  