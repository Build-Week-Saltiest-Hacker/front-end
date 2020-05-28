import {
    SET_USER_INFO,
    CLEAR_USER_INFO,
    FETCH_COMMENTS_START,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    SEARCH_USER_START,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE

} from '../actions/index'

export const initialState = {

    userInfo: null,
    commentList: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }

        case CLEAR_USER_INFO:
            return {
                ...state,
                userInfo: null
            }

        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                commentList: action.payload
            }

        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                commentList: action.payload
            }

        default:
            return state
    }
}