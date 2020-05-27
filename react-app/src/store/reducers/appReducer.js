import {
    LOGIN_START,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILURE

} from '../actions'

export const initialState = {
    username: '',
    commentList: [],
    savedComments: [],
    userInfo: null,
    isLoggingIn: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_START:
            return {
                ...state,
                isLoggingIn: true
            }

        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                isLoggingIn: false,
                username: action.payload
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false
            }

        default:
            return state
    }
}