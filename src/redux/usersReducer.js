import { getUser, deleteFollowUser, postFollowUser } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USER_COUNT = "SET-TOTAL-USER-COUNT"
const SET_IS_FETCHING = "SET-IS-FETCHING"
const FOLLOWING_PROGRESS = "FOLLOWING_PROGRESS"

const firstState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: []

}

const usersReducer = (state = firstState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, followed: true } : user
                )
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, followed: false } : user
                )
            }
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USER_COUNT: {
            return { ...state, totalUserCount: action.totalUserCount }
        }
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingProgress:
                    action.isFetching
                        ? [...state.followingProgress, action.userId]
                        : [state.followingProgress.filter(id => id !== action.userId)]
            }
        }

        default:
            return state

    }
}



export const followAC = (userId) => ({ type: FOLLOW, id: userId })
export const unFollowAC = (userId) => ({ type: UNFOLLOW, id: userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUserCount = (totalUserCount) => ({ type: SET_TOTAL_USER_COUNT, totalUserCount })
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching })
export const setFollowingProgress = (isFetching, userId) => ({ type: FOLLOWING_PROGRESS, isFetching, userId })


export const getUserThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true))
        getUser(currentPage, pageSize).then(response => {
            dispatch(setIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUserCount(response.totalCount))
        }
        );

    }

}


export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, userId))
        postFollowUser(userId).then(response => {
            if (response.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(setFollowingProgress(false, userId))
        })

    }

}


export const unFollow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, userId))
        deleteFollowUser(userId).then(response => {
            if (response.resultCode === 0) {
                dispatch(unFollowAC(userId))
            }
            dispatch(setFollowingProgress(false, userId))
        })

    }

}

export default usersReducer