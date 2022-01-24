import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {ConfigModule} from "@nestjs/config";
import {EventsModule} from "./events/events.module";
import {AuthModule} from "./auth/auth.module";
import {AppController} from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env' ,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
