import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ModelRepository } from '@common/database/repositories';

import BulkEmailJobEntity from './bulk-email-job.entity';

@Injectable()
class BulkEmailJobRepository extends ModelRepository<BulkEmailJobEntity> {
  constructor(private dataSource: DataSource) {
    super(BulkEmailJobEntity, dataSource.createEntityManager());
  }
}

export default BulkEmailJobRepository;
