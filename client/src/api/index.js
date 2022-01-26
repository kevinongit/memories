import axios from 'axios'

const endpoint = axios.create({baseURL: 'http://localhost:5000'})
// const url = 'https://memories-2022.herokuapp.com/posts'

endpoint.interceptors.request.use(req => {
  const profile = JSON.parse(localStorage.getItem('profile'))
  if (profile) {
    req.headers.Authorization = `Bearer ${profile.token}`
  }

  return req
})

export const fetchPosts = () => endpoint.get('/posts')
export const createPost = newPost => endpoint.post('/posts', newPost)
export const updatePost = (id, updatedPost) =>
  endpoint.patch(`/posts/${id}`, updatedPost)
export const deletePost = id => endpoint.delete(`/posts/${id}`)
export const likePost = id => endpoint.patch(`/posts/${id}/likePost`)

export const signin = formData => endpoint.post('/user/signin', formData)
export const signup = formData => endpoint.post('/user/signup', formData)
