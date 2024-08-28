import { Button, Form, Stack } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import commentsServices from "../../services/comments.services"
import { useParams } from "react-router-dom"

const CommentForm = ({ fetchCommentsDetails }) => {

  const [commentValue, setCommentValue] = useState({ text: "" })

  const [textValidation, setTextValidation] = useState({
    active: false,
    text: ""
  })

  const { loggedUser } = useContext(AuthContext)

  const { postId } = useParams()

  const handleCommentInput = e => {
    const { value } = e.target
    setCommentValue({ text: value })
    commentValue.text.length > 19 && setTextValidation({ active: false, text: "" })
  }

  const handleSubmitComment = e => {

    e.preventDefault()

    commentsServices
      .postComment(postId, commentValue)
      .then(() => {

        setCommentValue({ text: "" })
        fetchCommentsDetails()

      })
      .catch(err => {
        console.log(err)
        setTextValidation({
          active: true,
          text: err.response.data.errors.text.message
        })
      })
  }

  useEffect(() => {

  }, [textValidation.active])

  return (

    <Form className="CommentForm" onSubmit={handleSubmitComment}>

      <Form.Group className="mb-3">
        <Form.Label className="d-flex align-items-center">
          <img src={loggedUser.avatar} alt={loggedUser.nick} className="thumb-user-avatar me-2" />
          <strong>@{loggedUser.nick}</strong>
        </Form.Label>
        <Form.Control as="textarea" rows={4} value={commentValue.text} onChange={handleCommentInput} required />

        {
          (textValidation.active && commentValue.text.length < 20) &&
          <Form.Text className="text-danger mb-0">
            <small>{textValidation.text}</small>
          </Form.Text>
        }

      </Form.Group>

      <Stack direction="horiontal">
        <Button variant="dark" type="submit" className="ms-auto px-3" size="sm">Send</Button>
      </Stack>

    </Form >

  )
}

export default CommentForm