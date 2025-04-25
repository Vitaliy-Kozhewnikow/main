import axios from "axios"



const instance = axios.create({ 
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': '4899e22d-4f49-466f-85db-a99e2023109d'
        }
})

export const profileResponce = async (userId) => { 
    const response = await instance.get(`profile/` + userId)  
    return response.data
}

export const AuthMe = async () => { 
    const response = await instance.get(`auth/me`)  
    return response.data
}

export const getUser = async (currentPage, pageSize) => {

    const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
    return response.data


}


export const postFollowUser = async (userId) => { 
    const response = await instance.post('follow/' +userId)
    return response.data
}

export const deleteFollowUser = async (userId) => { 
    const response = await instance.delete('follow/' +userId)
    return response.data
}

export const getProfileApi = async (profileId) => { 
    const response = await instance.get(`profile/` + profileId)
    return response.data
}

export const getStatus = async (profileId) => { 
    const response = await instance.get(`profile/status/` + profileId)
    return response.data
}

export const updateStatus = async (status) => { 
    const response = await instance.put(`profile/status/`, { status: status})
    console.log('Ответ сервера (updateStatus):', response); 
    return response.data
}   

export const loginApi = async (email, password,rememberMe) => { 
    const response = await instance.post('auth/login', {email, password,rememberMe})
    return response.data
}

export const logoutApi = async () => { 
    const response = await instance.delete('auth/login')
    return response.data
}

export const savePhotoApi = async (photoFile) => {
    const formData = new FormData()
    formData.append('image', photoFile)
    const response = await instance.put('profile/photo', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return response
}
