import { Form } from "react-bootstrap"
import uploadServices from "../../services/upload.services"

const NewImageForm = ({ setImageData, imageData, handleInputChange }) => {


  const handleFileUpload = e => {

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setImageData([...imageData, res.data.cloudinary_url])
      })
      .catch(err => console.log(err))
  }

  return (
    <Form.Group className="mb-3" controlId="image">
      <Form.Label>Images:*</Form.Label>
      <Form.Control type="file" onChange={handleFileUpload} required />
    </Form.Group>
  )
}

export default NewImageForm