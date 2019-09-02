import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_MEMORIES,
    MEMORY_ERROR,
    DELETE_MEMORY,
    ADD_MEMORY,
    GET_MEMORY,
    ADD_IMAGE,
    REMOVE_IMAGE
} from './types';

// Get memories
export const getMemories = () => async dispatch => {
    try {
        const res = await axios.get('/api/memories');

        dispatch({
            type: GET_MEMORIES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: MEMORY_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// Delete memory
export const deleteMemory = id => async dispatch => {
    try {
      await axios.delete(`/api/memories/${id}`);
  
      dispatch({
        type: DELETE_MEMORY,
        payload: id
      });
  
      dispatch(setAlert('Memory Removed'));
    } catch (err) {
      dispatch({
        type: MEMORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Add memory
  export const addMemory = formData => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post('/api/memories', formData, config);
  
      dispatch({
        type: ADD_MEMORY,
        payload: res.data
      });
  
      dispatch(setAlert('Memory Created'));
    } catch (err) {
      dispatch({
        type: MEMORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Get memory
  export const getMemory = id => async dispatch => {
    try {
      const res = await axios.get(`/api/memories/${id}`);
  
      dispatch({
        type: GET_MEMORY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEMORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Add image
  export const addImage = (memoryId, formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(
        `/api/memories/image/${memoryId}`,
        formData,
        config
      );
  
      dispatch({
        type: ADD_IMAGE,
        payload: res.data
      });
  
      dispatch(setAlert('Image Added'));
    } catch (err) {
      dispatch({
        type: MEMORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete image
  export const deleteImage = (memoryId, imageId) => async dispatch => {
    try {
      await axios.delete(`/api/memories/image/${memoryId}/${imageId}`);
  
      dispatch({
        type: REMOVE_IMAGE,
        payload: imageId
      });
  
      dispatch(setAlert('Image Removed'));
    } catch (err) {
      dispatch({
        type: MEMORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  