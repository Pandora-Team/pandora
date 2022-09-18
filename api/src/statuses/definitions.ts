export class CreateStatusData {
    readonly user_id?: string
    readonly event_id?: string
    payment_status?: string
    readonly event_status?: string
    price?: number
    discount?: number
    prepayment?: string
}

export enum TypeStatus {
    Nearest = "nearest", // Ближайший МК
    Go = "go", // Пойду
    Visited = "visited", // Посетил
    NotVisited = "notVisited", // посетил
    Cash = "cash", // Наличными
    Card = "card", // Перевод на карту
    Paid = "paid", // Оплатил
    NotPaid = "notPaid", // Не оплатил
    NeedRefund = "needRefund", // Нужен возврат
    makeRefund = "makeRefund", // Сделать возврат
    madeRefund = "madeRefund" // Возврат сделан
}