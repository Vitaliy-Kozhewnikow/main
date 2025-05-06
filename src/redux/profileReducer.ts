import {getProfileApi, getStatus as fetchStatus, savePhotoApi, updateStatus as updateStatusAPI} from "../api/api"
import {Dispatch} from "redux";

const PROFILE_ACTION_TYPES = {
    ADD_POST: 'ADD-POST',
    UPDATE_INFO_PROFILE: 'UPDATE-INFO-PROFILE',
    SET_STATUS: 'SET-STATUS',
    DELETE_POST: 'DELETE-POST',
    SAVE_PHOTO: 'SAVE-PHOTO'
} as const

type ProfileActionTypes = typeof PROFILE_ACTION_TYPES[keyof typeof PROFILE_ACTION_TYPES]

type postsDataTypes = {
    id: number
    text: string
    likesCount: number
}
type PhotosType = {
    small: string | null
    large: string | null
}
type ContactsType = {
    vk: string | null
    facebook: string | null
    github: string | null
    twitter: string | null
    youtube: string | null
}

export type ProfileInfoType = {
    id: number
    photos: PhotosType
    contacts: ContactsType
} | null


type addPostAction = {
    type: typeof PROFILE_ACTION_TYPES.ADD_POST
    text: string
}
type setProfileAction = {
    type: typeof PROFILE_ACTION_TYPES.UPDATE_INFO_PROFILE
    info: ProfileInfoType
}
type setStatusAction = {
    type: typeof PROFILE_ACTION_TYPES.SET_STATUS
    status: string
}
type deletePostAction = {
    type: typeof PROFILE_ACTION_TYPES.DELETE_POST
    id: number
}
type savePhotoAction = {
    type: typeof PROFILE_ACTION_TYPES.SAVE_PHOTO
    photos: PhotosType
}
type ProfileAction =
    | addPostAction
    | setProfileAction
    | setStatusAction
    | deletePostAction
    | savePhotoAction




type firstStateType = {
    postsData: postsDataTypes[]
    newPostText: string
    info: ProfileInfoType
    status: string
}

const firstState: firstStateType = {
    postsData: [
        { id: 1, text: 'Suck me Dick', likesCount: 123 },
        { id: 2, text: 'Suck me Di', likesCount: 1234 },
        { id: 3, text: 'Suck me ', likesCount: 12345 },
        { id: 4, text: 'Suck ', likesCount: 123456 }
    ],
    newPostText: 'I think, what ...',
    info: null,
    status: 'Введите ваш статус...'
}

const profileReducer = (state: firstStateType = firstState, action: ProfileAction) => {
    switch (action.type) {
        case PROFILE_ACTION_TYPES.ADD_POST: {
            const newPost = {
                id: state.postsData.length + 1,
                text: action.text,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''

            }
        }

        case PROFILE_ACTION_TYPES.UPDATE_INFO_PROFILE: {
            return { ...state, info: action.info }
        }

        case PROFILE_ACTION_TYPES.SET_STATUS: {
            if (action.status == null) {
                return state
            } else {
            return { ...state, status: action.status }
            }
        }
        case PROFILE_ACTION_TYPES.DELETE_POST: {
            return {...state, postsData: state.postsData.filter(p=> p.id !== action.id)}
        }

        case PROFILE_ACTION_TYPES.SAVE_PHOTO: {
            debugger
            return {...state, info: {...state.info, photos: action.photos}}
        }



        default:
            return state;
    }



}

export const addPostActionCreator = (text: string) :addPostAction => ({ type: PROFILE_ACTION_TYPES.ADD_POST , text })

export const setProfile = (profile: ProfileInfoType) : setProfileAction => ({ type: PROFILE_ACTION_TYPES.UPDATE_INFO_PROFILE, info: profile })

export const setStatus = (status: string): setStatusAction => ({ type: PROFILE_ACTION_TYPES.SET_STATUS, status })

export const deletePost = (id:number) : deletePostAction => ({type: PROFILE_ACTION_TYPES.DELETE_POST, id})

export const savePhotoAC = (photos: PhotosType) : savePhotoAction => ( {type: PROFILE_ACTION_TYPES.SAVE_PHOTO, photos})


export default profileReducer;


export const getProfileInfo = (profileId) => {

    return (dispatch: Dispatch<ProfileAction>) => {
        getProfileApi(profileId).then(response => {
            dispatch(setProfile(response))
        }
        );

    }

}

export const getStatus = (profileId) => {

    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            fetchStatus(profileId).then(response => {
                dispatch(setStatus(response))
            }
            )
        }
        catch (error) { 
            console.error('Ошибка при получении статуса: ',  error)
        }
        }
}
        
        

    



export const updateStatus = (newStatus) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
      try {
        const response = await updateStatusAPI(newStatus);
        console.log('Ответ сервера:', response); 

        if (response.resultCode === 0) { // проверяем, вернул ли сервер успешный статус
            dispatch(setStatus(newStatus)); 
        } else {
            console.error('Ошибка обновления статуса:', response.messages);
        }
      }
      catch (error) { 
        console.error('Ошибка сети:', error);
      }
  }
}

export const savePhoto = (file) => {

    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            const response = await savePhotoApi(file);

            if (response.data.resultCode === 0 ) {
                dispatch(savePhotoAC(response.data.data.photos));
            }



        }
        catch (error) {
            console.error('Ошибка при загрузки изображения: ',  error)
        }
    }
}




