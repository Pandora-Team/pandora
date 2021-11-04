export const listStatuses = [
    { title: "Ближайший МК", class: "success", name: "nearest" },
    { title: "Пойду", class: "success", name: "go" },
    { title: "Посетил", class: "success", name: "visited" },
    { title: "Не посетил", class: "failure", name: "notVisited" },
    { title: "Наличными", class: "payment", name: "cash" },
    { title: "Перевод на карту", class: "payment", name: "card" },
    { title: "Оплатил", class: "payment", name: "paid" },
] as const

export const typesStatus = {
    nearest:      { title: "Ближайший МК", class: "success", name: "nearest" },
    go:           { title: "Пойду", class: "success", name: "go" },
    visited:      { title: "Посетил", class: "success", name: "visited" },
    notVisited:   { title: "Не посетил", class: "failure", name: "notVisited" },
    cash:         { title: "Наличными", class: "payment", name: "cash" },
    card:         { title: "Перевод на карту", class: "payment", name: "card" },
    paid:         { title: "Оплатил", class: "payment", name: "paid" },
    linkEvents:   { title: "Мероприятия", class: "link", name: "events" },
    linkStudents: { title: "Все участники", class: "link", name: "students" },
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
}