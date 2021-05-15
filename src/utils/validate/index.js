export function validUsername(str) {
    let pattern = /^[a-z]+$/g
    return pattern.test(str.trim())
}
export function validatePassword(str) {
    return str.length >= 5
}
