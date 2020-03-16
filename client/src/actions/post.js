import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  Add_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

//get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    console.log(res);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'Application/json'
    }
  };
  try {
    const res = await axios.post(
      'http://localhost:5000/api/posts',
      formData,
      config
    );
    dispatch({
      type: Add_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get a single post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}`,
      config,
      formData
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Add', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
