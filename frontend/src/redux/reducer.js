import { INITIATING_TODO_DATA_REQUEST,FETCH_TODO_DATA_SUCCESS,FETCH_TODO_DATA_FAILURE } from './types';

const initialState = {
    loading: false,
    data: [],
    error: ''
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIATING_TODO_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_TODO_DATA_SUCCESS:
            return {
                ...state,
                loading: false, data: action.payload, error: ''
            };

        case FETCH_TODO_DATA_FAILURE:
            return {
                ...state,
                loading: false, data: [], error: action.payload
            };

        default:
            return state;
    }
}

export default reducer;