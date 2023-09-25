/** @format */

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

class CreateBulkEmailJobDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  numberOfEmails: number;
}

export default CreateBulkEmailJobDTO;
