export const SET_USER_INFO = 'SET_USER_INFO'
export const setUserInfo = user => {
    return dispatch => {
        dispatch({ type: SET_USER_INFO, payload: user })
    }
}

export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
export const clearUserInfo = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_INFO })
    }
}