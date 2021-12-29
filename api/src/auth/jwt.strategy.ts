import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: function(req) {
                var token = null;
                if (req && req.cookies)
                {
                    token = req.cookies['at'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return {
            id:   payload._id,
        }
    }
}