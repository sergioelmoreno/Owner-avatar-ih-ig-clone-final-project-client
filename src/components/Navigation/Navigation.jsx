import './Navigation.css'
import { useContext } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import OverlayTooltip from "../OverlayTooltip/OverlayTooltip"

const Navigation = () => {

  const { loggedUser, logoutUser, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()
    logoutUser()
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary Navigation mb-3">
      <Container fluid>

        <Navbar.Brand as={Link} to={"/"} className="align-self-start"><strong>PhotoGram</strong></Navbar.Brand>
        <div className="d-flex flex-column flex-md-row justify-content-end align-items-center">
          <div className="d-flex align-items-center order-md-1">

            {
              loggedUser && (
                <OverlayTooltip tooltipText={'Go to profile page'} id={'user-tooltip'} placement={'bottom'}>
                  <Link to={'/profile'} className="user d-flex aligm-items-center me-2 me-md-0">
                    <img src={loggedUser.avatar} alt={loggedUser.nick} className="thumb-user-avatar me-2" />
                    <strong>@{loggedUser.nick}</strong>
                  </Link>
                </OverlayTooltip>
              )
            }

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

          </div>

          <Navbar.Collapse id="basic-navbar-nav">

            {
              loggedUser
                ?
                <>
                  <Nav className="me-3">
                    <Nav.Link as={Link} to={'/posts/new'}>New Post</Nav.Link>
                  </Nav>
                  <Nav className="me-3">
                    <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                </>
                :
                <>
                  <Nav className="me-3">
                    <Nav.Link as={Link} to={'/signup'}>Signup</Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                  </Nav>
                </>

            }
          </Navbar.Collapse>

        </div>

      </Container>
    </Navbar>
  )
}

export default Navigation