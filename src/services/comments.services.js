import axios from 'axios'

class CommentsServices {

  constructor() {

    this.axiosApp = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/api/comments`
    })

    this.axiosApp.interceptors.request.use(config => {

      const storedToken = localStorage.getItem('userAuthToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })

  }

  postComment(postId, commentData) {
    return this.axiosApp.post(`/${postId}`, commentData)
  }

  getCommentsList(postId) {
    return this.axiosApp.get(`/${postId}`)
  }

  editPost(postId, postData) {
    return this.axiosApp.put(`/edit/${postId}`, postData)
  }

  deleteComment(commentId) {
    return this.axiosApp.delete(`/${commentId}`)
  }

}


export default new CommentsServices()