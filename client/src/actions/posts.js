import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
} from '../constants/actionTypes'
import * as api from '../api'

export const getPosts = page => async dispatch => {
  try {
    dispatch({type: START_LOADING})
    const {data} = await api.fetchPosts(page)
    dispatch({type: FETCH_ALL, payload: data})
    console.log({data})
  } catch (error) {
    console.log(error.message)
  } finally {
    dispatch({type: END_LOADING})
  }
}

export const getPost = id => async dispatch => {
  try {
    dispatch({type: START_LOADING})
    const {data} = await api.fetchPost(id)
    dispatch({type: FETCH_POST, payload: data})
    console.log({data})
  } catch (error) {
    console.log(error.message)
  } finally {
    dispatch({type: END_LOADING})
  }
}

export const getPostsBySearch = searchQuery => async dispatch => {
  try {
    dispatch({type: START_LOADING})

    const {
      data: {data},
    } = await api.fetchPostsBySearch(searchQuery)
    console.log({data})
    dispatch({type: FETCH_BY_SEARCH, payload: data})
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({type: END_LOADING})
  }
}

export const createPost = (post, navigate) => async dispatch => {
  try {
    dispatch({type: START_LOADING})

    const {data} = await api.createPost(post)

    dispatch({type: CREATE, payload: data})
    navigate(`/posts/${data._id}`)
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({type: END_LOADING})
  }
}

export const updatePost = (id, post) => async dispatch => {
  try {
    const {data} = await api.updatePost(id, post)
    dispatch({type: UPDATE, payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id)
    console.log({id})
    dispatch({type: DELETE, payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const likePost = id => async dispatch => {
  try {
    const {data} = await api.likePost(id)
    dispatch({type: LIKE, payload: data})
  } catch (error) {
    console.log(error)
  }
}
