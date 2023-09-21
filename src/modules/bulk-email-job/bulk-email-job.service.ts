import { Injectable } from '@nestjs/common';

@Injectable()
export default class BulkEmailJobService {
  getHello(): string {
    return 'Hello World!';
  }
}
