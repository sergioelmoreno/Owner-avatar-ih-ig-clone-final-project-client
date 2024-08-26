import axios from 'axios'

class PostsServices {

  constructor() {

    this.axiosApp = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
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
    return this.axiosApp.post(`/posts`, postData)

  }

  getAllPosts() {
    return this.axiosApp.get(`/posts`)
  }

}


export default new PostsServices()