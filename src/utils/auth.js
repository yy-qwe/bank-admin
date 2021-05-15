import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserInfoKey = 'Admin-UserInfo'
/* 
token存取
*/
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

/* 
用户信息存取
*/
export function getUserInfo() {
    return Cookies.getJSON(UserInfoKey)
}

export function setUserInfo(info) {
    return Cookies.set(UserInfoKey, info)
}

export function removeUserInfo() {
    return Cookies.remove(UserInfoKey)
}
