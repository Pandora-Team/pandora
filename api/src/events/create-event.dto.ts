export class CreateEventDto {
    readonly date: Date;
    readonly end_time: string;
    readonly name: string;
    readonly cover?: string;
    readonly message?: string;
    readonly price: string;
    readonly price_last?: number;
    readonly place_id?: string;
    readonly address?: string;
    readonly description?: string;
    readonly users_id?: [];
}