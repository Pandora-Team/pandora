import {ObjectId} from "mongoose";

export class CreateEventDto {
    readonly date: string | [];
    readonly start_time: string;
    readonly end_time: string;
    readonly name: string;
    readonly poster?: string;
    readonly message?: string;
    readonly price: number;
    readonly price_last?: number;
    readonly place_id?: ObjectId;
    readonly address?: string;
    readonly description?: string;
    readonly users_id?: [];
}