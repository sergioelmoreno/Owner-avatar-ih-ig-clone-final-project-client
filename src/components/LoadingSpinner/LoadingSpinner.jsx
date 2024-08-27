import { Spinner } from "react-bootstrap"

const LoadingSpinner = () => {

  const containerStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .6)"
  }

  return (
    <div style={containerStyle} className="d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  )
}

export default LoadingSpinner