import { GET_MEMORIES, MEMORY_ERROR } from '../actions/';

const initialState = {
    memories: [],
    memory: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MEMORIES:
            return {
                ...state,
                memories: payload,
                loading: false
            };
        case MEMORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }
}
