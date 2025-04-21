import { getProfileApi, getStatus as fetchStatus, updateStatus as updateStatusAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_INFO_PROFILE = 'UPDATE-INFO-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'

const firstState = {
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

const profileReducer = (state = firstState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: state.postsData.length + 1,
                text: action.posts,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''

            }
        }

        case UPDATE_NEW_POST_TEXT: {

            return {
                ...state,
                newPostText: action.newText
            }
        }

        case UPDATE_INFO_PROFILE: {
            return { ...state, info: action.info }
        }

        case SET_STATUS: {
            if (action.status == null) {
                return state
            } else {
            return { ...state, status: action.status }
            }
        }
        case DELETE_POST: { 
            return {...state, postsData: state.postsData.filter(p=> p.id != action.id)}
        }



        default:
            return state;
    }



}

export const addPostActionCreator = (posts) => ({ type: ADD_POST , posts })

export const setProfile = (profile) => ({ type: UPDATE_INFO_PROFILE, info: profile })

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const deletePost = (id) => ({type: DELETE_POST, id})

export default profileReducer;


export const getProfileInfo = (profileId) => {

    return (dispatch) => {
        getProfileApi(profileId).then(response => {
            dispatch(setProfile(response))
        }
        );

    }

}

export const getStatus = (profileId) => {

    return async (dispatch) => {
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
    return async (dispatch) => {
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




