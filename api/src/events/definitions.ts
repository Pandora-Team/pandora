export class CreateEventData {
    // Список дат
    readonly dates?: DateData[]
    readonly name?: string;
    readonly cover?: string;
    readonly message?: string;
    readonly price?: string;
    readonly place_id?: string;
    readonly address?: string;
    readonly description?: string;
    readonly recorded?: [];
    readonly canceled?: [];
    // Предоплата
    prepayment?: string | undefined
    // Тип занятия
    type?: EventTypeEnum
    // Доступность занятия
    availability?: EventAvailabilityEnum
    // Id главного занятия ( для проектов )
    main_event?: string
}

export class RecordOnEventData {
    readonly event_id: string
    readonly payment_status: string
    readonly price?: number
    readonly discount?: number
}

export interface DateData {
    date: string
    end_time: string
}

export enum EventTypeEnum {
    MasterClass = "МК",
    Project = "Проект"
}

export enum EventAvailabilityEnum {
    OpenStatus = "Открытое занятие",
    CloseStatus = "Закрытое занятие"
}

// Начало акции для новичков и тех, кто посещает 4 занятия подряд
export const beginStock = 1644958800000

// массив новичков, кто давно зарегистрирован, но ни разу не ходил
export const newbieUsers = [
    "61d47f99082349001d59666c", // Левина
    "61d4c286082349001d596674", // Босых
    "61d4dc05082349001d596676", // Бучева
    "61dc6e5649d5f3001e7e6bcc", // Дектярникова
    "61e4575940e9e5001eedc64f", // марданова
    "61e5776440e9e5001eedc652", // Соловьева
    "61ec5d5d40e9e5001eedc65f", // Рязанова
    "61f03ba02d9133001eb442fa", // Аленичева
    "61f132042d9133001eb44311", // Кузнецова
    "61f475ba2d9133001eb44323", // Супранович
    "61fbb5af204d0d0020b1bdc6", // Суханова
    "6200252c204d0d0020b1bdcb", // Kolodyazhnaya
    "620159e0204d0d0020b1bdcc", // У
    "6205616b204d0d0020b1bdcd", // рассадина
    "620f8f63204d0d0020b1bdf0" // Попова
]