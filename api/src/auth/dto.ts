export class RegisterDto {
    readonly name: string
    readonly phone: string
    readonly pass: string
    role?: string
    readonly birthday?: string
    readonly surname?: string
    reg_date?: string
    visit_date?: string
}

export class LoginDto {
    readonly phone: string
    readonly pass: string
    visit_date?: string
}