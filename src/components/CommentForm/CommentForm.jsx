import { Button, Form, Stack } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import commentsServices from "../../services/comments.services"
import { useParams } from "react-router-dom"

const CommentForm = ({ fetchPostDetails }) => {

  const [commentValue, setCommentValue] = useState({ text: "" })

  const { loggedUser } = useContext(AuthContext)

  const { postId } = useParams()

  const handleCommentInput = e => {
    const { value } = e.target
    setCommentValue({ text: value })
  }

  const handleSubmitComment = e => {
    e.preventDefault()
    console.log(postId, commentValue)
    commentsServices
      .postComment(postId, commentValue)
      .then(() => {
        setCommentValue({ text: "" })
        fetchPostDetails()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {

  }, [handleSubmitComment])

  return (

    <Form className="CommentForm" onSubmit={handleSubmitComment}>

      <Form.Group className="mb-3">
        <Form.Label className="d-flex align-items-center">
          <img src={loggedUser.avatar} alt={loggedUser.nick} className="thumb-user-avatar me-2" />
          <strong>@{loggedUser.nick}</strong>
        </Form.Label>
        <Form.Control as="textarea" rows={4} value={commentValue.text} onChange={handleCommentInput} required />
      </Form.Group>

      <Stack direction="horiontal">
        <Button variant="dark" type="submit" className="ms-auto px-3" size="sm">Send</Button>
      </Stack>

    </Form>

  )
}

export default CommentForm