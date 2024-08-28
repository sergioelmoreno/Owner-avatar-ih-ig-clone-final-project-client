import './UserInfo.css'
import { Stack } from "react-bootstrap"

const UserInfo = ({ owner }) => {

  const { nick, avatar } = owner

  return (
    <Stack direction="horizontal" gap={2} className="UserInfo me-auto">
      <img src={avatar} alt={`${nick} avatar`} />
      <span>{nick}</span>
    </Stack>
  )
}

export default UserInfo