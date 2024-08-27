import { Container } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <Container>

        <h1>Create a new account:</h1>
        <LoginForm />

      </Container>
    </div>
  )
}

export default LoginPage