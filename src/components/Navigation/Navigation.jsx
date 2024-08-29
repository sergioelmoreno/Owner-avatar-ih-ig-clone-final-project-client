import './Navigation.css'
import logo from './../../assets/logo.svg'
import list from './../../assets/list.svg'
import sergioelmoreno from './../../assets/sergioelmoreno.png'
import { useContext, useState } from "react"
import { Button, Container, Image, Nav, Navbar, Offcanvas, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import OverlayTooltip from "../OverlayTooltip/OverlayTooltip"

const Navigation = () => {

  const { loggedUser, logoutUser, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleLogout = e => {
    e.preventDefault()
    logoutUser()
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary Navigation mb-3">
      <Container fluid>

        <Navbar.Brand as={Link} to={"/"} className="align-self-start">
          <Stack direction='horizontal' gap={2}>
            <img src={logo} alt="Aperture" />
            <strong>Aperture</strong>
          </Stack>
        </Navbar.Brand>

        <div className="d-flex ">
          <div className="d-flex align-items-center">

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

          </div>
          <Button variant="link" onClick={handleShow} className="ms-2">
            <img src={list} alt="Menu" />
          </Button>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Stack gap={2} className='h-100'>
              <div>

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
              </div>

              <div className="mt-auto">
                <h4>About me:</h4>
                <Stack gap={2} direction='horizontal'>
                  <Image src={sergioelmoreno} roundedCircle className='thumb-user-avatar' />
                  <a href="https://github.com/sergioelmoreno" target='blank' className='external-link'>Sergioelmoreno</a>
                </Stack>

              </div>
            </Stack>
          </Offcanvas.Body>
        </Offcanvas>


      </Container>
    </Navbar>
  )
}

export default Navigation