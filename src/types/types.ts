import { VideoInfo } from './video';

export type AxiosResponse<T> = T & {
  success?: string;
  error?: string;
};

export type DownloadResponse = {
  url: string;
  status: VideoInfo['status'] | 'already' | 'restart';
  timestamp: number;
};