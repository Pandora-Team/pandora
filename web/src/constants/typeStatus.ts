export const typesStatus = {
    nearest: { title: "Ближайший МК", class: "success" },
    go:      { title: "Пойду", class: "success" },
    visited: { title: "Посетил", class: "success" },
    notCome: { title: "Не пришёл", class: "failure" },
    cash:    { title: "Наличными", class: "payment" },
    card:    { title: "Перевод на карту", class: "payment" },
    paid:    { title: "Перевод на карту", class: "payment" },
} as const

export interface typeStatus {
    title: string
    class: string
}