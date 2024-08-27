import { Container } from "react-bootstrap"
import ProfileForm from "../../components/ProfileForm/ProfileForm"

const ProfilePage = () => {

  return (
    <Container>
      <h1>Edit my profile:</h1>
      <hr />
      <ProfileForm />
    </Container>
  )
}

export default ProfilePage