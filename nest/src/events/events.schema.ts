import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type EventsDocument = Events & Document;

@Schema()
export class Events {

    @Prop()
    date: string;

    @Prop()
    time: string;

}

export const EventsSchema = SchemaFactory.createForClass(Events);