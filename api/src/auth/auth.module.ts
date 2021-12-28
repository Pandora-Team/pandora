import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UsersSchema} from "../users/users.schema";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: {expiresIn: 36000}
        }),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}