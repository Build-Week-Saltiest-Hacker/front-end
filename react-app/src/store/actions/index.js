import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { userLogin } from '../../utils/userLogin'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const handleLogin = (credentials, cb) => {

    return dispatch => {
        dispatch({ type: LOGIN_START })

        axiosWithAuth()
            .post('/auth/login', credentials)
            .then(res => {

                userLogin(res.data.message, res.data.token, cb)
                dispatch({ type: LOGIN_SUCCESSFUL, payload: credentials.username })
            })
            .catch(err => {
                console.log(err.response)
                dispatch({ type: LOGIN_FAILURE })
            })
    }

}