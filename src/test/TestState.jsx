import { useReducer, createContext } from "react";
import TestReducer from "./TestReducer";
import TestContext from "./TestContext";
import {
    SET_DATA_USER,
    SET_DATA_AUTH,
    CERRAR_SESION,
} from './types'
import axios from "axios";

const cx = axios.create({
    baseURL: 'http://localhost:4000',
});

const token = localStorage.getItem("token");
if(token) {
    cx.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete cx.defaults.headers.common['Authorization'];
}

const TestState = ({ children }) => {

    const initialState = {
        auth: false,
        nombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        date: "",
        email: "",
        telefono: "",
    }
    
    const [state, dispatch] = useReducer(TestReducer, initialState)
    
    const postData = async (data) => {
        try{
            const response = await cx.post("/api/users", data);
            localStorage.setItem("token", response.data.token);
            dispatch({
                type: SET_DATA_USER,
                payload: response.data.user
            });
        } catch(e) {
            console.log(e)
        }
    }

    const handleAuthData  = async () => {
        try{
            const response = await cx.post("/api/users/auth");
            dispatch({
                type: SET_DATA_AUTH,
                payload: response.data.user
            });
        } catch(e){
            localStorage.removeItem("token");
        }
    }

    const handleCloseSession = async () => {
        localStorage.removeItem("token")
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <TestContext.Provider
            value={{
                auth: state.auth,
                nombre: state.nombre,
                segundoNombre: state.segundoNombre,
                apellidoPaterno: state.apellidoPaterno,
                apellidoMaterno: state.apellidoMaterno,
                date: state.date,
                email: state.email,
                telefono: state.telefono,
                postData,
                handleAuthData,
                handleCloseSession,
            }}
        >
            { children }
        </TestContext.Provider>
    )
}


export default TestState