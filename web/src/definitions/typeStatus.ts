export const listStatuses = [
    { title: "Ближайший МК", class: "success", name: "nearest" },
    { title: "Пойду", class: "success", name: "go" },
    { title: "Посетил", class: "success", name: "visited" },
    { title: "Не посетил", class: "failure", name: "notVisited" },
    { title: "Наличными", class: "payment", name: "cash" },
    { title: "Перевод на карту", class: "payment", name: "card" },
    { title: "Оплатил", class: "payment", name: "paid" },
    { title: "Не оплатил", class: "payment", name: "notPaid" },
    { title: "Нужен возврат", class: "payment", name: "needRefund" },
    { title: "Сделать возврат", class: "payment", name: "makeRefund" },
    { title: "Возврат сделан", class: "payment", name: "madeRefund" },
] as const

export const typesStatus = {
    nearest:      { title: "Ближайший МК", class: "success", name: "nearest" },
    go:           { title: "Пойду", class: "success", name: "go" },
    visited:      { title: "Посетил", class: "success", name: "visited" },
    notVisited:   { title: "Не посетил", class: "failure", name: "notVisited" },
    cash:         { title: "Наличными", class: "payment", name: "cash" },
    card:         { title: "Перевод на карту", class: "payment", name: "card" },
    paid:         { title: "Оплатил", class: "payment", name: "paid" },
    notPaid:      { title: "Не оплатил", class: "payment", name: "notPaid" },
    linkEvents:   { title: "Мероприятия", class: "link", name: "events" },
    linkStudents: { title: "Все участники", class: "link", name: "students" },
    needRefund:   { title: "Нужен возврат", class: "payment", name: "needRefund" },
    makeRefund:   { title: "Сделать возврат", class: "payment", name: "makeRefund" },
    madeRefund:   { title: "Возврат сделан", class: "payment", name: "madeRefund" },
} as const

export interface typeStatus {
    title: string
    class: string
    name: string
}

export interface statusData {
    _id?: string
    event_id?: string
    event_status?: string
    payment_status?: string
    price?: number
    discount?: number
}