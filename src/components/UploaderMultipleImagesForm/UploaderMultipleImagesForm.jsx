import { Form } from "react-bootstrap"
import uploadServices from "../../services/upload.services"

const UploaderMultipleImagesForm = ({ setImageData, imageData, labelText }) => {


  const handleFileUpload = e => {

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices
      .uploadimages(formData)
      .then(res => {

        const imagesArr = []
        res.data.cloudinary_urls.forEach(image => imagesArr.push(image))
        setImageData([...imageData, ...imagesArr])

      })
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
      <Form.Control type="file" onChange={handleFileUpload} multiple />
    </Form.Group>
  )
}

export default UploaderMultipleImagesForm