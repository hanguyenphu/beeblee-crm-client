import { AUTHENTICATE, LOGOUT, UPDATE_PROFILE, FETCH_PROVINCE, PUSH_BUSINESS_TO_MODAL } from '../constants/action-types'

export function authenticate(payload) {
    return {type: AUTHENTICATE, payload}
}

export function update_profile(payload){
    return {type: UPDATE_PROFILE, payload}
}

export function logout() {
    return {type: LOGOUT, payload:null}
}

export function fetch_province(payload) {
    return {type: FETCH_PROVINCE, payload}
}

export function push_business_to_modal(payload) {
    return {type: PUSH_BUSINESS_TO_MODAL, payload}
}

