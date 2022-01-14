export interface EventData {
    _id: string
    date: Date | string
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
    surname: string
    payment_status: string
    status_id: string
    avatar?: string
}

export interface UpdateUserData {
    vk?: string
    telegram?: string
    instagram?: string
    name?: string
    surname?: string
    birthday?: string
}

export interface NotificationData {
    state: boolean
    text: string
    type: string
}

export interface SocialData {
    id: number
    path: string
    icon: string
    active: boolean
}

export interface UserData {
    name: string
    phone: string
    birthday: string
    avatar?: string
    surname: string
    vk: string
    instagram: string
    telegram: string
    events?: UserVisitedEventsData[]
}

export interface UserVisitedEventsData {
    _id?: string
    date?: Date
    name?: string
}

export type styleClass = (string | { [key: string]: boolean })[]

export type styleClassObject = { [key: string]: boolean }

export interface FlickingOptionData {
    align:                string
    noPanelStyleOverride: boolean
    disableOnInit:        boolean
    autoInit:             boolean
    autoResize:           boolean
}