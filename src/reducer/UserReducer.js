const userData = {
    signinStatus: false
}


const UserReducer =( state = userData, action )=>{

    switch(action.type){
        case 'SET_SIGN_IN':
            return {
                ...state,
                signinStatus:action.payload
            }
        default: return state
    }

}

export default UserReducer;