import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  Add_POST
} from '../actions/types';
const initiateState = {
  posts: [],
  post: null,
  loading: true,
  error: []
};

export default function(state = initiateState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        payload: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload.id),
        loading: false
      };
    case Add_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    default:
      return state;
  }
}
