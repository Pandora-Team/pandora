import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
} from 'nestjs-telegraf';
import { Context } from "telegraf"

@Update()
export class BotUpdate {
    @Start()
    async start(@Ctx() ctx: Context) {
        await ctx.reply('Welcome Men');
    }

    @Help()
    async help(@Ctx() ctx: Context) {
        await ctx.reply('Send me a sticker');
    }

    @On('sticker')
    async on(@Ctx() ctx: Context) {
        await ctx.reply('😘');
    }

    @Hears('hi')
    async hears(@Ctx() ctx: Context) {
        await ctx.reply('Hey there');
    }
}