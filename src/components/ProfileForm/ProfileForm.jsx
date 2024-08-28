import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useContext, useEffect, useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { subtractYears } from "../../utils/date.utils"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import UploaderSingleImageForm from '../UploaderSingleImageForm/UploaderSingleImageForm'

const ProfileForm = () => {

  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    avatar: "",
    country: "",
    phone: "",
    birth: ""
  })

  const [isLoadingData, setIsLoadingData] = useState(false)

  const { loggedUser, logoutUser } = useContext(AuthContext)

  const [imageData, setImageData] = useState()

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

  const handleDate = date => {
    setProfileData({ ...profileData, date })
  }

  const reloadAvatarImage = () => {
    setProfileData({ ...profileData, avatar: imageData })
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
          navigate('/')
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

  useEffect(() => {
    reloadAvatarImage()
  }, [imageData])

  return (

    <Form onSubmit={handleFormSubmit} className="ProfileForm pb-6">

      <Row className="mb-3">

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={nick} name="nick" disabled></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} name="email" disabled />
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" value={profileData.firstname} name="firstname" onChange={handleInputChange} ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" value={profileData.lastname} name="lastname" onChange={handleInputChange} ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Country:</Form.Label>
            <Form.Control type="text" value={profileData.country} name="country" onChange={handleInputChange} ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="text" value={profileData.phone} name="phone" onChange={handleInputChange} ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <div className="d-flex align-items-center justify-content-stretch mb-3">
            {/* TODO: Change the avatar at the loggedUser payload */}
            <img src={profileData.avatar} alt={profileData.nick} className="user-avatar me-2" />
            <span className="flex-grow-1">
              <UploaderSingleImageForm setImageData={setImageData} labelText={'Avatar'} />
            </span>
          </div>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-6">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control as={DatePicker} value={profileData.birth} name="birth" onChange={handleDate} maxDate={maxDate} required />
            <Form.Text className="text-muted">
              Restrict to users 18 years and older
            </Form.Text>
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
          <div className="p-3 mt-3 w-100 danger-container bg-danger text-center rounded">
            <Button variant="danger" onClick={handleDeleteUser} >Delete user</Button>
          </div>
        </Col>
      </Row>

    </Form>
  )
}

export default ProfileForm  