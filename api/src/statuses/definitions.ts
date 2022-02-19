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