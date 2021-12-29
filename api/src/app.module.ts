import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";
import {EventsModule} from "./events/events.module";
import {StatusesModule} from "./statuses/statuses.module";
import {AuthModule} from "./auth/auth.module";
import {PlacesModule} from "./places/places.module";
import {FileModule} from "./file/file.module";

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
    UsersModule,
    PlacesModule,
    EventsModule,
    StatusesModule,
    FileModule,
  ],
})
export class AppModule {}
