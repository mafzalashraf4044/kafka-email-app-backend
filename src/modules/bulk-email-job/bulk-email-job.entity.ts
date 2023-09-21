/** @format */

import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@common/database';
import { JobStatus } from '@common/enums';

@Entity()
export class BulkEmailJob extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  jobId: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: JobStatus,
    array: false,
    default: JobStatus.Pending,
  })
  status: JobStatus;

  @Column({
    type: 'int',
    nullable: false,
  })
  numberOfEmails: number;
}

export default BulkEmailJob;
