import axios from 'axios'

class PostsServices {

  constructor() {

    this.axiosApp = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/api/posts`
    })

    this.axiosApp.interceptors.request.use(config => {

      const storedToken = localStorage.getItem('userAuthToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })

  }

  savePost(postData) {
    return this.axiosApp.post(`/`, postData)
  }

  getPost(postId) {
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


export default new PostsServices()