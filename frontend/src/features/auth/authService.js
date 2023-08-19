import axios from "axios"

const API_URL = "/api/users"

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    //axios returns response.data
    if (response.data) {
        //we store response in the localstorage 
        //local storage can only hold string
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//login service
const login = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData)
    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem("user")
}
const authService = {
    register,
    login,
    logout
}


export default authService