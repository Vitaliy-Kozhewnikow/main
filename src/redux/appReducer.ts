import { } from "../api/api"
import { Auth } from "./authReducer"


const APP_REDUCER_ACTION_TYPE = {
    SET_INITIALIZER: 'SET-INITIALIZER',
    INITIALIZATION_FAILED: 'APP/INITIALIZATION_FAILED'
} as const

type appReducerTypes = typeof APP_REDUCER_ACTION_TYPE[keyof typeof APP_REDUCER_ACTION_TYPE]

//action creator type
type setInitializerType = {
    type: typeof APP_REDUCER_ACTION_TYPE.SET_INITIALIZER
}
type setInitializationErrorType = {
    type: typeof APP_REDUCER_ACTION_TYPE.INITIALIZATION_FAILED,
    error: string
}

type appReducerActionType =
    |setInitializerType
    |setInitializationErrorType

//state migrate to TS
type firstStateType = {
    initialized: boolean,
    error: string,
}
const firstState: firstStateType = {

    initialized: false,
    error: ''

}

const appReducer = (state:firstStateType = firstState, action:appReducerActionType) => {
    switch (action.type) {
        case APP_REDUCER_ACTION_TYPE.SET_INITIALIZER: {
            debugger
            return {

                ...state,
                initialized: true,
                error: null
            }
        }
        case APP_REDUCER_ACTION_TYPE.INITIALIZATION_FAILED: {
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

export const setInitializer = (): setInitializerType => ({ type: APP_REDUCER_ACTION_TYPE.SET_INITIALIZER })
export const setInitializationError = (error: string): setInitializationErrorType => ({
    type: APP_REDUCER_ACTION_TYPE.INITIALIZATION_FAILED,
    error
})


export const initializeApp = () => {
    return async (dispatch) => {
        try {
            await dispatch(Auth())
            dispatch(setInitializer())
        } catch (error) {
            console.error('initializer failed', error)
            dispatch(setInitializationError(
                error.code === 'ERR_NETWORK'
                ? 'Сервер недоступен. Проверьте подключение.'
                : 'Ошибка авторизации'))
            
        }

    }

}


export default appReducer;