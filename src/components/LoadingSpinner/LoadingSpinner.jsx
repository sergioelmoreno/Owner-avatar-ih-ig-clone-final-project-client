import './LoadingSpinner.css'
import { Spinner } from "react-bootstrap"

const LoadingSpinner = () => {

  return (
    <div className="LoadingSpinner d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  )
}

export default LoadingSpinner