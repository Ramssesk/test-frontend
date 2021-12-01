import {
    SET_DATA_USER,
    SET_DATA_AUTH,
    CERRAR_SESION,
} from './types'

const AuthReducer = (state, action) => {
    switch(action.type) {
        case SET_DATA_USER:                                                    
            return {
                ...state,
                auth: true,
                nombre: action.payload.nombre,
                segundoNombre: action.payload.segundoNombre,
                apellidoPaterno: action.payload.apellidoPaterno,
                apellidoMaterno: action.payload.apellidoMaterno,
                date: action.payload.date,
                email: action.payload.email,
                telefono: action.payload.telefono,
            }
        case SET_DATA_AUTH:
            return {
                ...state,
                auth: true,
                nombre: action.payload.nombre,
                segundoNombre: action.payload.segundoNombre,
                apellidoPaterno: action.payload.apellidoPaterno,
                apellidoMaterno: action.payload.apellidoMaterno,
                date: action.payload.date,
                email: action.payload.email,
                telefono: action.payload.telefono,
            }
        case CERRAR_SESION:
            return {
                ...state,
                auth: false,
                nombre: "",
                segundoNombre: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                date: "",
                email: "",
                telefono: "",
            }
        default:
            return state
    }
}

export default AuthReducer