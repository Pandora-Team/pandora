export class StatusData {
    _id: string
    user_id: string
    event_id: string
    payment_status: string
    event_status: string
}

export class CreateStatusData {
    readonly user_id?: string
    readonly event_id?: string
    readonly payment_status?: string
    readonly event_status?: string
}

export enum TypeStatus {
    Nearest = "nearest", // Ближайший МК
    Go = "go", // Пойду
    Visited = "visited", // Посетил
    NotVisited = "notVisited", // посетил
    Cash = "cash", // Наличными
    Card = "card", // Перевод на карту
    Paid = "paid", // Оплатил
    NeedRefund = "needRefund" // Нужен возврат
}