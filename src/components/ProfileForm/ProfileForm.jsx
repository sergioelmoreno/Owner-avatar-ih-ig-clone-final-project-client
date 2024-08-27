import { useContext, useEffect, useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { subtractYears } from "../../utils/date.utils"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

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

  const [isLoadingData, setIsLoadingData] = useState(false)

  const { loggedUser, logoutUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const fetchProfileData = () => {

    authServices
      .getUserProfile()
      .then(({ data }) => {
        setProfileData({ ...data })
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

  const handleFormSubmit = e => {
    e.preventDefault()

    setIsLoadingData(true)

    authServices
      .updateUserProfile(profileData)
      .then(() => {
        setIsLoadingData(false)
        fetchProfileData()
      })
      .catch(err => console.log(err))
  }

  const handleDeleteUser = e => {
    e.preventDefault()

    if (confirm("Are you sure? all your contents will be deleted!")) {
      authServices
        .deleteUser(loggedUser._id)
        .then(() => {

          logoutUser()

          if (!isLoading) {
            navigate('/')
          }

        })
        .catch(err => console.log(err))
    }

  }

  const maxDate = subtractYears(new Date(), 18)
  const nick = profileData.nick
  const email = profileData.email

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (

    <Form onSubmit={handleFormSubmit} className="ProfileForm">
      {/* TODO: Check the console error! */}
      <Row className="mb-3">

        <Col md={6}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" defaultValue={nick} name="nick" disabled></Form.Control>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" defaultValue={email} name="email" disabled />
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
            {/* TODO: Add Uploader */}
            <Form.Group>
              <Form.Label>Avatar:</Form.Label>
              <Form.Control type="text" value={profileData.avatar} name="avatar" onChange={handleInputChange}></Form.Control>
            </Form.Group>
          </div>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control as={DatePicker} value={profileData.birth} name="birth" onChange={handleDatePost} maxDate={maxDate} required />
            <Form.Text className="text-muted">
              Restrict to users 18 years and older
            </Form.Text>
          </Form.Group>
        </Col>

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
      <div className="p-3 mt-3 bg-danger text-center rounded">
        <Button variant="danger" onClick={handleDeleteUser} >Delete user</Button>
      </div>

    </Form>
  )
}

export default ProfileForm  