import { JobStatus } from '@common/enums';

export interface BulkEmailJob {
  numberOfEmails: number;
  status: JobStatus;
  jobId: string;
}

export interface GetBulkEmailJobsResponse {
  count: number;
  data: BulkEmailJob[];
};

export interface CreateBulkEmailJobResponse {
  jobId: string;
};

export interface GetSentEmailsCountResponse {
  count: number;
};