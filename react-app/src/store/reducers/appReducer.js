import {
    LOGIN_START,
    LOGIN_SUCCESSFUL

} from '../actions'

export const initialState = {
    token: '',
    commentList: [],
    savedComments: [],
    userInfo: null,
    isFetching: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_START:
            return {
                ...state,
                isFetching: true
            }

        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                token: action.payload,
                isFetching: false
            }

        default:
            return state
    }
}