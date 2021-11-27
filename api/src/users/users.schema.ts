import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {

    @Prop()
    pass?: string;

    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    phone: string;

    @Prop()
    role?: string;

    @Prop()
    birthday?: string;

    @Prop()
    avatar?: string;

    @Prop()
    vk?: string

    @Prop()
    instagram?: string

    @Prop()
    telegram?: string

}

export const UsersSchema = SchemaFactory.createForClass(Users);