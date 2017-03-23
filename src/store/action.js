// Define the actions of a user threw the App

export const SET_USER_PERMISSION = 'SET_USER_PERMISSION'
export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const DELETE_USER_TOKEN = 'DELETE_USER_TOKEN'
export const DENIED_USER = 'DENIED_USER'

/**
 * Set User Permission
 * @param {String} permission 
 */
export function setUserPermission(permission = 'user') {
    return {type : SET_USER_PERMISSION, permission}
}

// Defining actions creator 

/**
 * Set User Token
 * @param {String} token 
 */
export function setUserToken(token) {
    return {type : SET_USER_TOKEN, token}
}

/**
 * Delete User Token
 * @param {Number} userID 
 */
export function deleteUserToken(userID) {
    return {type : DELETE_USER_TOKEN, userID}
}

/**
 * Denied User 
 * @param {Number} userID 
 */
export function deniedUser(userID) {
    return {type : DENIED_USER, userID}
}
