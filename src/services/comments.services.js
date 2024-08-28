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
    return this.axiosApp.get(`/post/${postId}`)
  }

  editPost(postId, postData) {
    return this.axiosApp.put(`/post/edit/${postId}`, postData)
  }

  deletePost(postId) {
    return this.axiosApp.delete(`/delete/${postId}`)
  }

  getAllPosts() {
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/api/posts`)
  }

}


export default new CommentsServices()