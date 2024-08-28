import heart from './../../assets/heart.svg'
import heartFill from './../../assets/heart-fill.svg'
import postsServices from "../../services/posts.services"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const LikesForm = ({ postData, setPostData }) => {

  let idArr = postData.likes
  const handleIdArr = arr => {
    idArr = arr
  }

  const { loggedUser } = useContext(AuthContext)

  const { _id: userId } = loggedUser

  const handleLikes = () => {

    let idArrCopy = idArr

    if (idArr.includes(userId)) {

      idArrCopy = idArr.filter(id => id !== userId)
      handleIdArr(idArrCopy)

    } else {

      idArrCopy.push(userId)
      handleIdArr(idArrCopy)

    }

    submitPostData()
  }

  const submitPostData = () => {

    const data = { ...postData, likes: idArr }

    postsServices
      .editPost(postData._id, data)
      .then(() => {
        setPostData(data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    handleIdArr(idArr)
  }, [idArr])

  return (
    <span className={`likes d-flex align-items-center gap-2 ${loggedUser && 'clickable'}`} onClick={loggedUser && handleLikes}>
      {idArr?.length}
      <img src={!idArr || !idArr.length ? heart : heartFill} alt="Like" style={{ width: "20px" }} />
    </span>
  )
}

export default LikesForm