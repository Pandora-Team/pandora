import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusesDocument = Statuses & Document;

@Schema()
export class Statuses {

    @Prop()
    user_id: string

    @Prop()
    event_id: string

    @Prop()
    payment_status: string

    @Prop()
    event_status: string

    @Prop()
    discount?: number

    @Prop()
    price?: number

    @Prop()
    prepayment?: string

}

export const StatusesSchema = SchemaFactory.createForClass(Statuses);