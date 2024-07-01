const backendDomain = 'http://localhost:7000'

const summaryApi = {
    signUp :{
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    }
}

export default summaryApi;