/** @format */

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

class SendEmailsDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  numberOfEmails: number;
}

export default SendEmailsDTO;
