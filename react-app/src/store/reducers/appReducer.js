import {
    SET_USER_INFO,
    CLEAR_USER_INFO

} from '../actions/index'

export const initialState = {

    userInfo: null
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

        default:
            return state
    }
}