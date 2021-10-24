export class RegisterDto {
    readonly name: string
    readonly phone: string
    readonly pass: string
    role?: string
}

export class LoginDto {
    readonly phone: string
    readonly pass: string
}