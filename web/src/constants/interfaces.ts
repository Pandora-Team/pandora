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
}