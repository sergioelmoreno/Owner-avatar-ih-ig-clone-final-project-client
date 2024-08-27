import { Form } from "react-bootstrap"
import uploadServices from "../../services/upload.services"

const NewImageForm = ({ setImageData, imageData, labelText, max }) => {


  const handleFileUpload = e => {

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        if (max > 1 && imageData.length < 3) {
          const imgArr = [...imageData]
          imgArr.push(res.data.cloudinary_url)
          setImageData(imgArr)
        } else {
          setImageData(res.data.cloudinary_url)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Form.Group className="mb-3" controlId="image">
      {
        labelText &&
        <Form.Label>
          {labelText}:<sup>*</sup>
        </Form.Label>
      }
      <Form.Control type="file" onChange={handleFileUpload} required />
    </Form.Group>
  )
}

export default NewImageForm