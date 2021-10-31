export const listStatuses = [
    { title: "Ближайший МК", class: "success", name: "nearest" },
    { title: "Пойду", class: "success", name: "go" },
    { title: "Посетил", class: "success", name: "visited" },
    { title: "Не пришёл", class: "failure", name: "notCome" },
    { title: "Наличными", class: "payment", name: "cash" },
    { title: "Перевод на карту", class: "payment", name: "card" },
    { title: "Перевод на карту", class: "payment", name: "paid" },
] as const

export const typesStatus = {
    nearest: { title: "Ближайший МК", class: "success", name: "nearest" },
    go:      { title: "Пойду", class: "success", name: "go" },
    visited: { title: "Посетил", class: "success", name: "visited" },
    notCome: { title: "Не пришёл", class: "failure", name: "notCome" },
    cash:    { title: "Наличными", class: "payment", name: "cash" },
    card:    { title: "Перевод на карту", class: "payment", name: "card" },
    paid:    { title: "Перевод на карту", class: "payment", name: "paid" },
} as const

export interface typeStatus {
    title: string
    class: string
    name: string
}

export interface statusData {
    _id?: string
    event_id: string
    event_status: string
    payment_status: string
}