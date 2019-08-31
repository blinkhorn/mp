import axios from 'axios';
import { setAlert } from './alert';
import { GET_MEMORIES, MEMORY_ERROR } from './types';

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
