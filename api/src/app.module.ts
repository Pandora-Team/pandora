import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";
import {EventsModule} from "./events/events.module";
import {PaymentsModule} from "./payments/payments.module";
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {PlacesModule} from "./places/places.module";

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
    PaymentsModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: `${process.env.JWT_EXPIRES_IN}`}
    }),
  ],
})
export class AppModule {}
