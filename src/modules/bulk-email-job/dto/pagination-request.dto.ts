import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance, Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class PaginationRequestDTO {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  skip = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  take = 10;
}

@Injectable()
export class PaginationTransformPipe implements PipeTransform {
  async transform(dto: PaginationRequestDTO, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }

    return plainToInstance(metatype, dto);
  }
}
