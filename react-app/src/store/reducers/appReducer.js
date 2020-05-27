import {
    LOGIN_START,
    LOGIN_SUCCESSFUL

} from '../actions'

export const initialState = {
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
                isFetching: false
            }

        default:
            return state
    }
}