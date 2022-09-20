export interface EventData {
    _id: string
    date: Date | string
    end_time: string
    name: string
    price: string
    place_id?: string
    address?: string
    recorded?: string[]
    canceled?: string[]
    cover?: File
    status: string[]
    status_id?: string
    payment?: string
    recorded_users?: UserInfo[]
    canceled_users?: UserInfo[]
    discount?: boolean
    type?: EventTypeEnum
    availability?: EventAvailabilityEnum
    prepayment?: string
    main_event?: string
}

export enum EventTypeEnum {
    MasterClass = "МК",
    Project = "Project classes"
}

export enum EventAvailabilityEnum {
    OpenStatus = "Открытое занятие",
    CloseStatus = "Закрытое занятие"
}

export interface CreateEventData {
    _id: string
    date: Date | string
    end_time: string
    name: string
    price: string
    place_id?: string
    address?: string
    cover?: File
    type: string
}

export interface DateData {
    id: number
    date: string
    end_time: string
}

export interface RecordOnEventData {
    event_id?: string
    event_status?: string
    payment_status?: string
}

export interface UserInfo {
    event_status: string
    name: string
    surname: string
    payment_status: string
    status_id: string
    avatar?: string
    price?: number
    discount?: number
    prepayment?: string
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
    id?: number
    name: string
    phone: string
    birthday: string
    avatar?: string
    surname: string
    vk: string
    instagram: string
    telegram: string
    events?: UserVisitedEventsData[]
    reg_date: Date
}

export interface UserVisitedEventsData {
    _id?: string
    date?: Date
    name?: string
}

export type styleClass = (string | { [key: string]: boolean })[]

export type styleClassObject = { [key: string]: boolean }

export interface PlaceData {
    address: string
    _v?: number
    _id: string
}

