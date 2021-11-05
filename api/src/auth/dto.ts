export class RegisterDto {
    readonly name: string
    readonly phone: string
    readonly pass: string
    role?: string
    readonly birthday?: string
    readonly surname?: string
}

export class LoginDto {
    readonly phone: string
    readonly pass: string
}