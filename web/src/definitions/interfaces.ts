export interface EventData {
    _id: string
    date: Date
    start_time?: string
    end_time: string
    name: string
    price: string
    place_id?: string
    address?: string
    users_id?: string[]
    cover?: File
    status: string[]
    status_id: string
    payment?: string
    users?: UserInfo[]
}

export interface UserInfo {
    event_status: string
    name: string
    payment_status: string
    status_id: string
}


export interface SocialData {
    id: number
    path: string
    icon: string
}

export interface UpdateUserData {
    vk?: string
    telegram?: string
    instagram?: string
    name?: string
    surname?: string
    birthday?: string
}