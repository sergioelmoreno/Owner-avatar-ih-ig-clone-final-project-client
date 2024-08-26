import { Container } from "react-bootstrap"
import SignupForm from "../../components/SignupForm/SignupForm"

const SignupPage = () => {

  return (
    <div className="SignupPage">
      <Container>
        <h1>Signup:</h1>

        <SignupForm />

      </Container>
    </div>
  )
}

export default SignupPage