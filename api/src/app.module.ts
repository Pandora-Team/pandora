import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";
import {EventsModule} from "./events/events.module";
import {StatusesModule} from "./statuses/statuses.module";
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {PlacesModule} from "./places/places.module";
import {FileModule} from "./file/file.module";
import { TelegrafModule } from 'nestjs-telegraf';
import {BotModule} from "./bot/bot.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env' ,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TelegrafModule.forRoot({
      token: `${process.env.PANDORA_BOT_TOKEN}`,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UsersModule,
    PlacesModule,
    EventsModule,
    StatusesModule,
    FileModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`}
    }),
    BotModule,
  ],
})
export class AppModule {}
