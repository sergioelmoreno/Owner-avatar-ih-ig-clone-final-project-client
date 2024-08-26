import './Navigation.css'
import { useContext } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import OverlayTooltip from "../OverlayTooltip/OverlayTooltip"

const Navigation = () => {

  const { loggedUser, logoutUser } = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary Navigation mb-3">
      <Container fluid>

        <Navbar.Brand as={Link} to={"/"} className="align-self-start">IGclone</Navbar.Brand>
        <div className="d-flex flex-column flex-md-row justify-content-end align-items-center">
          <div className="d-flex align-items-center order-md-1">

            {
              loggedUser && (
                <OverlayTooltip tooltipText={'Go to profile page'} id={'user-tooltip'} placement={'bottom'}>
                  <Link to={'/profile'} className="user d-flex aligm-items-center me-2 me-md-0">
                    <img src={loggedUser.avatar} alt={loggedUser.nick} className="me-2" />
                    <strong>@{loggedUser.nick}</strong>
                  </Link>
                </OverlayTooltip>
              )
            }

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-3">
              <Nav.Link as={Link} href="/about-us">About us</Nav.Link>
            </Nav>

            {
              loggedUser
                ?
                <>
                  <Nav className="me-3">
                    <Nav.Link as={Link} to={'/posts/new'}>New Post</Nav.Link>
                  </Nav>
                  <Nav className="me-3">
                    <Nav.Link as={Link} onClick={logoutUser}>Logout</Nav.Link>
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