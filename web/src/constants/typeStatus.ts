export const typesStatus = {
    actual: { title: "Актуально", background: "#00B0A6" },
} as const

export interface typeStatus {
    title: string
    background: string
}