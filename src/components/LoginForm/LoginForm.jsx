import { useContext, useState } from "react"
import { Button, Form, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const { loginUser, isLoading } = useContext(AuthContext)

  const handleLoginData = e => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const navigate = useNavigate()

  const handleLoginSubmit = e => {
    e.preventDefault()

    loginUser(loginData)

    if (!isLoading) {
      navigate('/')
    }

  }

  return (
    <Form onSubmit={handleLoginSubmit} className="LoginForm">
      <Stack direction="vertical">

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={loginData.email} onChange={handleLoginData}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={loginData.password} onChange={handleLoginData} ></Form.Control>
        </Form.Group>

      </Stack>

      <Button variant="success" type="submit" className="w-100">Login</Button>

    </Form>
  )
}

export default LoginForm