import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import {jwtConstants} from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: function(req) {
                var token = null;
                if (req && req.cookies)
                {
                    token = req.cookies['at'];
                }
                console.log("[token] - ", token)
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        console.log("[payload] - ", payload)
        return {
            id:   payload._id,
        }
    }
}