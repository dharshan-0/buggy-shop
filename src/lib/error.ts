import { AuthError } from "next-auth"

export class CustomError extends AuthError {
  code: string
  constructor(message: string) {
    super(message)
    this.code = message
  }
}
export class InvalidLoginError extends CustomError{
    constructor(message: string) {
        super(message)
    }
}