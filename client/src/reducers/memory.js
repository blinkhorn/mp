import {
    GET_MEMORIES,
    MEMORY_ERROR,
    DELETE_MEMORY,
    ADD_MEMORY,
    GET_MEMORY,
    ADD_IMAGE,
    REMOVE_IMAGE
} from '../actions/types';

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
        case GET_MEMORY:
            return {
                ...state,
                memory: payload,
                loading: false
            };
        case ADD_MEMORY:
            return {
                ...state,
                memories: [payload, ...state.memories],
                loading: false
            };
        case DELETE_MEMORY:
            return {
                ...state,
                memories: state.memories.filter(
                    memory => memory._id !== payload
                ),
                loading: false
            };
        case MEMORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ADD_IMAGE:
            return {
                ...state,
                memory: { ...state.memory, images: payload },
                loading: false
            };
        case REMOVE_IMAGE:
            return {
                ...state,
                memory: {
                    ...state.memory,
                    images: state.memory.images.filter(
                        image => image._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}
