import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type EventsDocument = Events & Document;

interface UserInfo {
    name: string
    payment_status: string
    event_status: string
}

@Schema()
export class Events {

    @Prop()
    _id: string;

    @Prop()
    date: Date;

    @Prop()
    end_time: string;

    @Prop()
    name: string;

    @Prop()
    cover?: string;

    @Prop()
    message?: string;

    @Prop()
    price: string;

    @Prop()
    price_last?: number;

    @Prop()
    place_id?: string;

    @Prop()
    address?: string;

    @Prop()
    description?: string;

    @Prop()
    users_id: string[];

    @Prop()
    users?: UserInfo[]

    @Prop()
    status?: string[] | undefined

    @Prop()
    status_id?: string
}

export const EventsSchema = SchemaFactory.createForClass(Events);