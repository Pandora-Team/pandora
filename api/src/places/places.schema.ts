import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PlacesDocument = Places & Document;

@Schema()
export class Places {

    @Prop()
    address: string;

}

export const PlacesSchema = SchemaFactory.createForClass(Places);