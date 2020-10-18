import * as actionTypes from './actions';

const initialState = {
    isLogged: false,
    loggedUser: {},
    recoverEmail: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER:
            return {
                ...state,
                loggedUser: action.loggedUser
            };

        case actionTypes.LOGIN:
            return {
                ...state,
                isLogged: true,
                loggedUser: action.loggedUser
            };

        case actionTypes.LOGOUT:
            return {
                ...state,
                isLogged: false,
                loggedUser: {}
            };

        case actionTypes.SET_RECOVER_EMAIL:
            return {
                ...state,
                recoverEmail: action.email,
            };

        default:
            return state;
    }
}

export default reducer;
