const backendDomain = 'http://localhost:7000'

const summaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    currentUser: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },  
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    } 
}

export default summaryApi;