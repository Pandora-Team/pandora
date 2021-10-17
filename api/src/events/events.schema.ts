import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';

export type EventsDocument = Events & Document;

@Schema()
export class Events {

    @Prop({type: String || []})
    date: string;

    @Prop()
    start_time: string;

    @Prop()
    end_time: string;

    @Prop()
    name: string;

    @Prop()
    poster?: string;

    @Prop()
    message?: string;

    @Prop()
    price: number;

    @Prop()
    price_last?: number;

    @Prop({type: String})
    place_id?: ObjectId;

    @Prop()
    address?: string;

    @Prop()
    description?: string;

    @Prop()
    users_id?: [];
}

export const EventsSchema = SchemaFactory.createForClass(Events);