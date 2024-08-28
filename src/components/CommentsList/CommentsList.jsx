import './CommentsList.css'
import chatDots from './../../assets/chat-dots.svg'
import trashFill from './../../assets/trash-fill.svg'
import { useContext, useEffect, useState } from "react"
import { Badge, ListGroup, Stack } from "react-bootstrap"
import commentsServices from "../../services/comments.services"
import OverlayTooltip from '../OverlayTooltip/OverlayTooltip'
import { AuthContext } from '../../contexts/auth.context'

const CommentsList = ({ postId, commentsData, fetchCommentsDetails }) => {

  const { loggedUser } = useContext(AuthContext)

  const handleDeleteComment = commentId => {

    if (confirm("Are you sure? ")) {

      commentsServices
        .deleteComment(commentId)
        .then(() => fetchCommentsDetails())
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    fetchCommentsDetails()
  }, [])

  return (
    <>
      {commentsData.length > 0 && <hr />}
      <div className="d-flex align-items-center justify-content-between gap-2 mb-2 px-3">
        <span><strong><small>Comments:</small></strong></span>
        {
          commentsData.length > 0 &&
          <span><strong>
            <Badge bg="secondary">{commentsData.length}</Badge>
          </strong></span>
        }
      </div>
      <ListGroup variant="flush" data-bs-theme="light">
        {
          commentsData.map((comment, idx) => {
            const { nick, avatar, _id: userId } = comment.owner
            return (
              <ListGroup.Item key={`${nick}-${postId}-${idx}`}>
                <Stack direction='horizontal' gap={2}>

                  <div className="d-flex align-items-center me-auto mb-2">
                    <img src={avatar} alt={nick} className="thumb-user-avatar me-2" />
                    <strong>@{nick}</strong>
                  </div>

                  {
                    loggedUser?._id === userId &&
                    <OverlayTooltip tooltipText={'Delete comment'} id={'delete-tooltip'} placement={'auto'} variant={'danger'}>
                      <span className='delete-icon' onClick={() => handleDeleteComment(comment._id)}>
                        <img src={trashFill} alt="Delete comment" />
                      </span>
                    </OverlayTooltip>
                  }

                </Stack>
                <div className="d-flex align-items-center">
                  <img src={chatDots} alt="Comment" className='me-2' style={{ width: "1.5rem" }} />
                  <span>{comment.text}</span>
                </div>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>
  )
}

export default CommentsList