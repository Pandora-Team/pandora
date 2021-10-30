export interface EventData {
    _id: string
    date: Date
    start_time?: string
    end_time: string
    name: string
    price: string
    place_id?: string
    address?: string
    users_id?: []
    cover?: File
    status: string[]
    payment?: string
}