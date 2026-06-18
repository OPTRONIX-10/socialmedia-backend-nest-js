import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadExistsException extends HttpException {
  constructor(fieldName: string, fieldValue: string) {
    super(
      `Username with ${fieldName} ${fieldValue} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
