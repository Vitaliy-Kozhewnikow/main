import { } from "../api/api"
import { Auth } from "./authReducer"

const SET_INITIALIZATOR = 'SET-INITIALIZATOR'
const INITIALIZATION_FAILED = 'APP/INITIALIZATION_FAILED'




const firstState = {

    initialized: false,
    error: ''

}

const appReducer = (state = firstState, action) => {
    switch (action.type) {
        case SET_INITIALIZATOR: {
            debugger
            return {

                ...state,
                initialized: true,
                error: null
            }
        }
        case INITIALIZATION_FAILED: {
            debugger
            return {
                ...state,
                initialized: false,
                error: action.error
            }
        }

        default:
            return state;
    }



}

export const setInitializator = () => ({ type: SET_INITIALIZATOR })
export const setInitializationError = (error) => ({
    type: INITIALIZATION_FAILED,
    error
})


export const initializeApp = () => {
    return async (dispatch) => {
        try {
            await dispatch(Auth())
            dispatch(setInitializator())
        } catch (error) {
            console.error('initializator failed', error)
            dispatch(setInitializationError(
                error.code === 'ERR_NETWORK'
                ? 'Сервер недоступен. Проверьте подключение.'
                : 'Ошибка авторизации'))
            
        }

    }

}


export default appReducer;