import { axiosWithAuth } from '../../utils/axiosWithAuth'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const handleLogin = credentials => {
    return dispatch => {
        dispatch({ type: LOGIN_START })

        axiosWithAuth()
            .post('/login', credentials)
            .then(res => {
                console.log({ res })
                dispatch({ type: LOGIN_SUCCESSFUL })
                window.localStorage.setItem('token', JSON.stringify(res.data.token))
            })
            .catch(err => console.log({ err }))
    }

}