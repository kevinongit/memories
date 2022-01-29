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

/* eslint-disable import/no-anonymous-default-export */
export default (state = {isLoading: false, posts: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}

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
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
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
