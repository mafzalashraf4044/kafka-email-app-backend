import { JobStatus } from '@common/enums';

export interface BulkEmailJob {
  numberOfEmails: number;
  status: JobStatus;
  jobId: string;
}
