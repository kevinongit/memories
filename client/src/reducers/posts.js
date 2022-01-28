import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
} from '../constants/actionTypes'

/* eslint-disable import/no-anonymous-default-export */
export default (state = [], action) => {
  switch (action.type) {
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      }

    case CREATE:
      return {...state, posts: [...state.posts, action.payload]}
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== action.payload),
      }
    default:
      return state
  }
}
