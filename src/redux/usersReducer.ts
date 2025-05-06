import { getUser, deleteFollowUser, postFollowUser } from "../api/api"
import {Dispatch} from "redux";

//TS(типизированнее всех данных в reducer)
const USER_ACTION_TYPES = {
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    SET_USERS: "SET-USERS",
    SET_CURRENT_PAGE: "SET-CURRENT-PAGE",
    SET_TOTAL_USER_COUNT: "SET-TOTAL-USER-COUNT",
    SET_IS_FETCHING: "SET-IS-FETCHING",
    FOLLOWING_PROGRESS: "FOLLOWING_PROGRESS",
} as const

type UserActionTypes = typeof USER_ACTION_TYPES[keyof typeof USER_ACTION_TYPES]


type UserType = {
    id: number
    name: string
    status: string | null
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}

type FollowAction = {
    type: typeof USER_ACTION_TYPES.FOLLOW
    id: number
}
type UnfollowAction = {
    type: typeof USER_ACTION_TYPES.UNFOLLOW
    id: number
}
type SetUserAction = {
    type: typeof USER_ACTION_TYPES.SET_USERS
    users: UserType[]
}
type SetCurrentPageAction = {
    type: typeof USER_ACTION_TYPES.SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUserCountAction = {
    type: typeof USER_ACTION_TYPES.SET_TOTAL_USER_COUNT
    totalUserCount: number
}

type SetIsFetchingAction = {
    type: typeof USER_ACTION_TYPES.SET_IS_FETCHING
    isFetching: boolean
}

type FollowingProgressAction = {
    type: typeof USER_ACTION_TYPES.FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

type UsersActions =
    | FollowAction
    | UnfollowAction
    | SetUserAction
    | SetCurrentPageAction
    | SetTotalUserCountAction
    | SetIsFetchingAction
    | FollowingProgressAction



type firstStateType = {
    users: UserType[]
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: number[]
}

//JSX(reducer)
const firstState: firstStateType = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: []

}

const usersReducer = (state :firstStateType = firstState, action: UsersActions) => {
    switch (action.type) {
        case USER_ACTION_TYPES.FOLLOW: {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, followed: true } : user
                )
            }
        }
        case USER_ACTION_TYPES.UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, followed: false } : user
                )
            }
        }
        case USER_ACTION_TYPES.SET_USERS: {
            return { ...state, users: action.users }
        }
        case USER_ACTION_TYPES.SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case USER_ACTION_TYPES.SET_TOTAL_USER_COUNT: {
            return { ...state, totalUserCount: action.totalUserCount }
        }
        case USER_ACTION_TYPES.SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case USER_ACTION_TYPES.FOLLOWING_PROGRESS: {
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



export const followAC = (userId: number) : FollowAction => ({ type: USER_ACTION_TYPES.FOLLOW, id: userId })
export const unFollowAC = (userId: number): UnfollowAction => ({ type: USER_ACTION_TYPES.UNFOLLOW, id: userId })
export const setUsers = (users: UserType[]): SetUserAction => ({ type: USER_ACTION_TYPES.SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({ type: USER_ACTION_TYPES.SET_CURRENT_PAGE, currentPage })
export const setTotalUserCount = (totalUserCount: number): SetTotalUserCountAction => ({ type: USER_ACTION_TYPES.SET_TOTAL_USER_COUNT, totalUserCount })
export const setIsFetching = (isFetching: boolean): SetIsFetchingAction => ({ type: USER_ACTION_TYPES.SET_IS_FETCHING, isFetching })
export const setFollowingProgress = (isFetching: boolean, userId: number): FollowingProgressAction => ({ type: USER_ACTION_TYPES.FOLLOWING_PROGRESS, isFetching, userId })


export const getUserThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch<UsersActions>) => {
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
    return (dispatch: Dispatch<UsersActions>) => {
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
    return (dispatch: Dispatch<UsersActions>) => {
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