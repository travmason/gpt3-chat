import axios from 'axios'
import store from './redux/store'

const backendUrl = process.env.REACT_APP_GPT_URL || "http://localhost:4000"
console.log(process.env)
console.log("process.env.REACT_APP_GPT_URL:" + process.env.REACT_APP_GPT_URL)
console.log("BackendURL:" + backendUrl)
const protocol  = process.env.REACT_APP_GPT_PROTOCOL || "http"
const fullBackendUrl = `${protocol}://${backendUrl}`
console.log(fullBackendUrl)

function showENV(item, index, arr) {
    console.log("here");
    console.log(arr[index]);
}

export function isLoggedIn(){
    const state = store.getState()
    return state.user.userInfo !== undefined
}

export function isLoggedJWTPoll(){
    return false;
}

export function UserLogin(username, password){
    return axios({
        method: 'post',
        'Content-Type': 'application/json',
        url: `${fullBackendUrl}/api/user/login`,
        validateStatus: false,
        data: {
            username: username,
            password: password
        }
    })
}

export function UserSignUp(formObj){
    return axios({
        method: 'post',
        'Content-Type': 'application/json',
        url: `${fullBackendUrl}/api/user/signup`,
        validateStatus: false,
        data: formObj
    })
}

export function getUser(){
    const state = store.getState();
    console.log(state.user)
    return state.user.userInfo
}

export function getUsername(){
    return getUser()?.username
}

export function getPhotoUrl(username){
    return fullBackendUrl + "/images/" + username + ".jpeg"
}