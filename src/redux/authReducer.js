import { AuthMe, profileResponce, logoutApi, loginApi } from "../api/api"

const SET_USER_DATA = 'SET-USER-DATA'
const SET_USER_IMG = 'SET-USER-IMG'
const DELETE_USER = 'DELETE-USER'



const firstState = {

    id: null,
    email: null,
    login: null,
    isAuth: false,
    img: null

}

const authReducer = (state = firstState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            debugger
            return {

                ...state,
                id: action.data.id,
                email: action.data.email,
                login: action.data.login,
                isAuth: true
            }

        }
        case SET_USER_IMG: {
            return {
                ...state,
                img: action.img
            }
        }

        case DELETE_USER: { 
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

export const setUserData = (data) => ({ type: SET_USER_DATA, data })

export const setUserImg = (img) => ({ type: SET_USER_IMG, img })

export const deleteUser = () => ({type: DELETE_USER})



export const Auth = () => {
    return async (dispatch) => {
        const authResponse = await AuthMe()

        if (authResponse.resultCode === 0) {
            const userData = authResponse.data
            dispatch(setUserData(userData))
            const userId = userData.id

            const profileResponse = await profileResponce(userId)

            dispatch(setUserImg(profileResponse.photos.small))
        }

    }

}


export const login = (email, password, rememberMe) => {
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
    return async (dispatch) => {
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