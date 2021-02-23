const initialState = {
    user: null,
    profilePicture: null
}

const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

export function updateUser(payload){
    return {
        type: SET_USER,
        payload
    }
}

export function logout(payload){
    return {
        type: LOGOUT,
        payload
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_USER:
            return {...state, ...payload}
        case LOGOUT:
            return {...initialState}
        default:
            return state
    }
}