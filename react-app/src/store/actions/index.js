import axios from 'axios'
import { axiosWithAuth } from "../../utils/axiosWithAuth"

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

export const FETCH_COMMENTS_START = 'FETCH_COMMENTS_START'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'
export const fetchComments = () => {
    return dispatch => {
        dispatch({ type: FETCH_COMMENTS_START })

        axios
            .get('https://cors-anywhere.herokuapp.com/https://trolltrace.herokuapp.com/hightroll/')
            .then(res => {
                dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
                dispatch({ type: FETCH_COMMENTS_FAILURE })
            })
    }
}

export const SEARCH_USER_START = 'SEARCH_USER_START'
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE'
export const searchUser = user => {
    return dispatch => {
        dispatch({ type: SEARCH_USER_START })

        axios
            .get(`https://cors-anywhere.herokuapp.com/https://trolltrace.herokuapp.com/user/${user}`)
            .then(res => {
                dispatch({ type: SEARCH_USER_SUCCESS, payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
                dispatch({ type: SEARCH_USER_FAILURE })
            })
    }
}

export const DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT'
export const deleteUserAccount = username => {
    return dispatch => {
        dispatch({ type: DELETE_USER_ACCOUNT })

        axiosWithAuth()
            .delete(`/users/username=${username}`)
            .then(res => {
                console.log({ res })

            })
            .catch(err => {
                console.log(err.response)
            })
    }
}