import { Form } from "react-bootstrap"
import uploadServices from "../../services/upload.services"

const UploaderSingleImageForm = ({ setImageData, labelText }) => {


  const handleFileUpload = e => {

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => setImageData(res.data.cloudinary_url))
      .catch(err => console.log(err))
  }

  return (
    <Form.Group className="mb-3">
      {
        labelText &&
        <Form.Label>
          {labelText}:<sup>*</sup>
        </Form.Label>
      }
      <Form.Control type="file" className="w-100" onChange={handleFileUpload} />
    </Form.Group>
  )
}

export default UploaderSingleImageForm