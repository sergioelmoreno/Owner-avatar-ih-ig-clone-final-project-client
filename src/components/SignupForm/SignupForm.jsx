import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { CDNIMAGES } from './../../consts/image.consts'
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { subtractYears } from "../../utils/date.utils"
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import UploaderSingleImageForm from "../UploaderSingleImageForm/UploaderSingleImageForm"

const SignupForm = () => {

  const maxDate = subtractYears(new Date(), 18)

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    password: "",
    avatar: "",
    phone: "",
    country: "",
    birth: maxDate
  })

  const { avatar } = CDNIMAGES
  const [imageData, setImageData] = useState(avatar)

  const navigate = useNavigate()

  const handleInputChange = e => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleDate = date => {
    setSignupData({ ...signupData, birth: date })
  }

  const handleFormSubmit = e => {

    e.preventDefault()

    authServices
      .signupUser(signupData)
      .then(() => navigate('/login'))
      .catch(err => console.log(err))
  }

  const reloadAvatarImage = () => {
    setSignupData({ ...signupData, avatar: imageData })
  }

  useEffect(() => {
    reloadAvatarImage()
  }, [imageData])

  return (

    <Form onSubmit={handleFormSubmit} className="SignupForm" >

      <Row className="mb-3">

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Username:<sup>*</sup></Form.Label>
            <Form.Control type="text" value={signupData.nick} name="nick" onChange={handleInputChange} required></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Email:<sup>*</sup></Form.Label>
            <Form.Control type="email" value={signupData.email} name="email" onChange={handleInputChange} required />
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>First name:<sup>*</sup></Form.Label>
            <Form.Control type="text" value={signupData.firstname} name="firstname" onChange={handleInputChange} required></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Last name:<sup>*</sup></Form.Label>
            <Form.Control type="text" value={signupData.lastname} name="lastname" onChange={handleInputChange} required></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Password:<sup>*</sup></Form.Label>
            <Form.Control type="password" value={signupData.password} name="password" onChange={handleInputChange} required></Form.Control>
          </Form.Group>
        </Col>

        <Col md={{ span: 6 }}>
          <Form.Group className="mb-3">
            <Form.Label>Birthday:<sup>*</sup></Form.Label>
            <Form.Control as={DatePicker} value={signupData.birth} name="birth" onChange={handleDate} maxDate={maxDate} required />
            <Form.Text className="text-muted">
              Restrict to users 18 years and older
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex align-items-center justify-content-stretch mb-3">
            {/* TODO: Change the avatar at the loggedUser payload */}
            <img src={signupData.avatar} alt={signupData.nick} className="user-avatar me-2" />
            <span className="flex-grow-1">
              <UploaderSingleImageForm setImageData={setImageData} labelText={'Avatar'} />
            </span>
          </div>
        </Col>

        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }} className='mt-3'>
          <Button variant="success" className="w-100" type="submit">Register</Button>
        </Col>

      </Row>




    </Form>
  )
}

export default SignupForm  