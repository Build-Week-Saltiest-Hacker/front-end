import {
    SET_USER_INFO,
    CLEAR_USER_INFO,
    FETCH_COMMENTS_START,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    SEARCH_USER_START,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
    SAVE_COMMENT,
    FETCH_FAV_SUCCESS

} from '../actions/index'

export const initialState = {

    userInfo: null,
    commentList: [],
    favComments: []
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

        case FETCH_FAV_SUCCESS:
            return {
                ...state,
                favComments: action.payload
            }

        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                commentList: action.payload
            }

        case SAVE_COMMENT:
            return {
                ...state,
                favComments: [...state.favComments, action.payload]
            }

        default:
            return state
    }
}