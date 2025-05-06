import { AuthMe, profileResponce, logoutApi, loginApi } from "../api/api"
import {Dispatch} from "redux";
//ActionType
const AUTH_REDUCER_ACTION_TYPE = {
    SET_USER_DATA: 'SET-USER-DATA',
    SET_USER_IMG: 'SET-USER-IMG',
    DELETE_USER: 'DELETE-USER'
} as const

type authReducerActionType = typeof AUTH_REDUCER_ACTION_TYPE[keyof typeof AUTH_REDUCER_ACTION_TYPE]

//actionCreatorType
type dataType = {
    id: number
    email: string | null
    login: string | null
}

type setUserDataType = {
    type: typeof AUTH_REDUCER_ACTION_TYPE.SET_USER_DATA
    data: dataType
}

type setUserImgType = {
    type: typeof AUTH_REDUCER_ACTION_TYPE.SET_USER_IMG
    img : string | null
}
type deleteUserType = {
    type: typeof AUTH_REDUCER_ACTION_TYPE.DELETE_USER
}

type AuthActionType =
    |setUserDataType
    |setUserImgType
    |deleteUserType

//StateType
type firstStateType = {
     id: number
     email: string | null
     login: string | null
     isAuth: boolean
     img: string | null
}

const firstState: firstStateType = {

    id: 0,
    email: null,
    login: null,
    isAuth: false,
    img: null

}

const authReducer = (state: firstStateType = firstState, action:AuthActionType) => {
    switch (action.type) {
        case AUTH_REDUCER_ACTION_TYPE.SET_USER_DATA: {
            return {

                ...state,
                id: action.data.id,
                email: action.data.email,
                login: action.data.login,
                isAuth: true
            }

        }
        case AUTH_REDUCER_ACTION_TYPE.SET_USER_IMG: {
            return {
                ...state,
                img: action.img
            }
        }

        case AUTH_REDUCER_ACTION_TYPE.DELETE_USER: {
            return { 
                ...state,
                id: null,
                email: null,
                login: null,
                isAuth: false,
                img: null
            }
        }

        default:
            return state;
    }



}

export const setUserData = (data: dataType) : setUserDataType => ({ type: AUTH_REDUCER_ACTION_TYPE.SET_USER_DATA, data })

export const setUserImg = (img: string | null) : setUserImgType => ({ type: AUTH_REDUCER_ACTION_TYPE.SET_USER_IMG, img })

export const deleteUser = (): deleteUserType=> ({type: AUTH_REDUCER_ACTION_TYPE.DELETE_USER})



export const Auth = () => {
    return async (dispatch: Dispatch<AuthActionType>) => {

        try {
            const authResponse = await AuthMe()

        if (authResponse.resultCode === 0) {
            const userData = authResponse.data
            dispatch(setUserData(userData))
            const userId = userData.id

            const profileResponse = await profileResponce(userId)

            dispatch(setUserImg(profileResponse.photos.small))
        }
        } catch (error) {
            console.error('Ошибка получения данных пользователя', error)
        }

    }

}


export const login = (email : string, password: string, rememberMe : boolean = false) => {
    return async (dispatch) => {
        try {

            const response = await loginApi(email, password, rememberMe)
            console.log('Ответ сервера:', response);

            if (response.resultCode === 0) { // проверяем, вернул ли сервер успешный статус
                dispatch(Auth());
            } else {
                console.error('Ошибка авторизации:', response.messages);
                alert ("Вы ввели неправильный логин или пароль, попробуйте еще раз")
            }
        }
        catch (error) {
            console.error('Ошибка сети:', error);
        }
    }
}


export const logout = () => {
    return async (dispatch: Dispatch<AuthActionType>) => {
        try {

            const response = await logoutApi()
            console.log('Ответ сервера:', response);

            if (response.resultCode === 0) { // проверяем, вернул ли сервер успешный статус
                dispatch(deleteUser());
            } else {
                console.error('Ошибка выхода из аккаунта:', response.messages)
                alert ("Произошла ошибка выхода из аккаунта, повтори через 3")
            }
        }
        catch (error) {
            console.error('Ошибка сети:', error);
        }
    }
}

export default authReducer;