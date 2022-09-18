import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {EventAvailabilityEnum, EventTypeEnum} from "./definitions";

export type EventsDocument = Events & Document;

interface UserInfo {
    name: string
    payment_status: string
    event_status: string
}

@Schema()
export class Events {

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
    recorded: string[];

    @Prop()
    canceled: string[];

    @Prop()
    recorded_users?: UserInfo[]

    @Prop()
    canceled_users?: UserInfo[]

    @Prop()
    status?: string[] | undefined

    @Prop()
    status_id?: string

    @Prop()
    discount?: boolean

    @Prop()
    type?: EventTypeEnum

    @Prop()
    availability?: EventAvailabilityEnum

    @Prop()
    prepayment?: string

    @Prop()
    main_event?: string
}

export const EventsSchema = SchemaFactory.createForClass(Events);