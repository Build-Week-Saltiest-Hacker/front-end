export const userLogin = (message, token, cb) => {
    //get the username from the res message
    const username = message.split(' ')[0]

    //Store token to local storage
    window.localStorage.setItem('token', JSON.stringify(token))

    //Set logged in to true in local storage
    window.localStorage.setItem('loggedIn', true)

    //push user to the dashboard page
    cb(`/dashboard/${username}`)
}