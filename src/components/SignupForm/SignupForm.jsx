import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import authServices from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { subtractYears } from "../../utils/date.utils"

const SignupForm = () => {

  const maxDate = subtractYears(new Date(), 18)

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    password: "",
    avatar: "https://res.cloudinary.com/dkvtdgqxc/image/upload/v1724242583/person-circle_nda6qb.svg",
    birth: maxDate
  })

  const [birthData, setBirthData] = useState({ birth: new Date() })

  const navigate = useNavigate()

  const handleInputChange = e => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleBirthData = date => {
    setSignupData({ ...signupData, birth: date })
  }

  const handleFormSubmit = e => {

    e.preventDefault()

    authServices
      .signupUser(signupData)
      .then(() => navigate('/login'))
      .catch(err => console.log(err))
  }

  return (

    <Form onSubmit={handleFormSubmit} className="SignupForm" >

      <Container fluid>

        <Row className="mb-3">

          <Col md={6}>
            <Form.Group>
              <Form.Label>Username:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.nick} name="nick" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email:<sup>*</sup></Form.Label>
              <Form.Control type="email" value={signupData.email} name="email" onChange={handleInputChange} required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>First name:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.firstname} name="firstname" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Last name:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.lastname} name="lastname" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Password:<sup>*</sup></Form.Label>
              <Form.Control type="password" value={signupData.password} name="password" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Avatar:</Form.Label>
              <Form.Control type="text" value={signupData.avatar} name="avatar" onChange={handleInputChange}></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthday:<sup>*</sup></Form.Label>
              <Form.Control as={DatePicker} value={birthData.birth} name="birth" onChange={handleBirthData} maxDate={maxDate} required />
              <Form.Text className="text-muted">
                Restrict to users 18 years and older
              </Form.Text>
            </Form.Group>
          </Col>

        </Row>

        <Button variant="success" className="w-100" type="submit">Register</Button>

      </Container>

    </Form>
  )
}

export default SignupForm  